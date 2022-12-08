/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type VtsSkeletonParagraphWidth = number | string | Array<number | string>;
export type VtsSkeletonButtonShape = 'circle' | 'round' | 'default';
export type VtsSkeletonAvatarShape = 'square' | 'circle';
export type VtsSkeletonInputSize = 'large' | 'small' | 'default';
export type VtsSkeletonButtonSize = VtsSkeletonInputSize;
export type VtsSkeletonAvatarSize = VtsSkeletonInputSize | number;

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
