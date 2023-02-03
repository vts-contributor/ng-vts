/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsAvatarShape, VtsAvatarSize } from '@ui-vts/ng-vts/avatar';
import { VtsButtonShape, VtsButtonSize } from '@ui-vts/ng-vts/button';
import { VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';

export type VtsSkeletonParagraphWidth = number | string | Array<number | string>;

export type VtsSkeletonInputSize = VtsSizeLDSType;

export type VtsSkeletonButtonSize = VtsButtonSize;
export type VtsSkeletonButtonShape = VtsButtonShape;

export type VtsSkeletonAvatarSize = VtsAvatarSize | number;
export type VtsSkeletonAvatarShape = VtsAvatarShape;

export interface VtsSkeletonAvatar {
  size?: VtsSkeletonAvatarSize;
  shape?: VtsSkeletonAvatarShape;
}

export interface VtsSkeletonTitle {
  width?: number | string;
}

export interface VtsSkeletonParagraph {
  rows?: number;
  width?: VtsSkeletonParagraphWidth;
}
