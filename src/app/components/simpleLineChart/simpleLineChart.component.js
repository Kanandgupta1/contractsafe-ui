import _ from 'lodash';

import { Inject, ViewEncapsulation, ElementRef } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { ExtendedComponent } from '@fino/ng2-common';

import { 
  LocalizationPipe,
  LanguageService,
  Window 
} from '@fino/ng2-common';

import template from './simpleLineChart.html';
import styles from './simpleLineChart.scss';

@ExtendedComponent({
  inputs: ['values', 'unit', 'valueProperty', 'textProperty'],
  selector: 'simple-line-chart',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class SimpleLineChartComponent extends InjectableClass {
  get formattedValues() {
    const first = _.first(this.values);
    const last = _.last(this.values);
    return [first[this.valueProperty], ..._.map(this.values, v => v[this.valueProperty]), last[this.valueProperty]];
  }

  constructor(
    @Inject(LanguageService) languageService,
    @Inject(Window) window,
    @Inject(ElementRef) element) {
    super({ languageService, window, element });

    this.localizationPipe = new LocalizationPipe(languageService);
    this.creditHeight = 20;
  }

  getBottomHeight() {
    const windowHeight = this.window.innerHeight;
    const elementTop = this.element.nativeElement.offsetTop;
    return windowHeight - elementTop;
  }

  getOptions() {
    this.height = 'auto';
    const bottomHeight = this.getBottomHeight();
    const chartHeight = bottomHeight + this.creditHeight;
    const chart = { type: 'area' };
    if (chartHeight > 250) {
      this.height = `${bottomHeight}px`;
      this.fixedToBottom = true;
      chart.height = chartHeight;
    }
    return {
      chart,
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        minorTickLength: 0,
        tickLength: 0
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        minorTickLength: 0,
        tickLength: 0
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        area: {
            pointStart: 0,
            marker: {
                enabled: true,
                symbol: 'circle',
                lineColor: '#15CFB5',
                fillColor: '#fff',
                lineWidth: 2,
                radius: 8
            },
            dataLabels: {
              style: {
                fontWeight: 'normal',
                fontSize: '0.8rem'
              },
              useHTML: true,
              enabled: true,
              formatter: function (component) { 
                return function () {
                  if (this.x === 0 || this.x === component.values.length + 1) {
                    return '';
                  }
                  
                  const value = component.values[this.x - 1];
                  const labelTitle = component.languageService.translate(`chart.x.${value[component.textProperty]}`);
                  const formattedValue = component.localizationPipe.transform(value[component.valueProperty], component.unit);
                  return `<div class="chart-label text-centered">
                    <div class="text-light padding-bottom-quarter">${labelTitle}</div>
                    <span class="text-accent">${formattedValue}</span>
                  </div>`;
                }
              }(this)
            }     
        }
      },
      series: [{
        name: this.languageService.translate(`chart.series`),
        data: this.formattedValues
      }]
    };
  }

  ngAfterViewInit() {
    // Prevent change after checked error
    setTimeout(() => {
      this.valueProperty = this.valueProperty || 'value';
      this.options = this.getOptions();
    });
  }
};