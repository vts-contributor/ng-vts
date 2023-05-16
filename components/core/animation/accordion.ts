/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  animate,
  AnimationTriggerMetadata,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AnimationCurves } from './animation-consts';

export const accordionMotion: AnimationTriggerMetadata = trigger('accordionMotion', [
  state('expanded', style({ height: '*' })),
  state('collapsed', style({ height: 0, overflow: 'hidden' })),
  state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
  transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('expanded => hidden', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('hidden => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);

export const treeAccordionMotion: AnimationTriggerMetadata = trigger('treeAccordionMotion', [
  transition('* => *', [
    query(
      'vts-tree-node:leave,vts-tree-builtin-node:leave',
      [
        style({ overflow: 'hidden' }),
        stagger(0, [
          animate(
            `150ms ${AnimationCurves.EASE_IN_OUT}`,
            style({ height: 0, minHeight: 0, opacity: 0, 'padding-bottom': 0 })
          )
        ])
      ],
      {
        optional: true
      }
    ),
    query(
      'vts-tree-node:enter,vts-tree-builtin-node:enter',
      [
        style({
          overflow: 'hidden',
          height: 0,
          minHeight: 0,
          opacity: 0,
          'padding-bottom': 0
        }),
        stagger(0, [
          animate(
            `150ms ${AnimationCurves.EASE_IN_OUT}`,
            style({
              overflow: 'hidden',
              height: '*',
              minHeight: '*',
              opacity: '*',
              'padding-bottom': '*'
            })
          )
        ])
      ],
      {
        optional: true
      }
    )
  ])
]);
