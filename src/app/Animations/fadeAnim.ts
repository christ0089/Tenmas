import {animate, animateChild, query, stagger, style, transition, trigger} from '@angular/animations';

export class FadeAnimation {
  public static staggerForMS = (time: number) => {
    return trigger('staggerForMS', [
      transition(':enter', [
        query(':enter',
              stagger( time + 'ms', [animateChild()]),
              { optional: true })
      ])
    ]);
  }

  public static fadeInMS =  (time: number) => {
    return trigger('fadeInMS', [
      transition(':enter', [
        style({ opacity: '0'}),
        animate( time + 'ms ease-in', style({ opacity: '1' })),
      ]),
    ]);
  }
}
