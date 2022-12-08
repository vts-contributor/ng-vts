import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsListModule } from '../list';
import { VtsDemoCommentBasicComponent } from './demo/basic';
import { VtsDemoCommentEditorComponent } from './demo/editor';
import { VtsDemoCommentListComponent } from './demo/list';
import { VtsDemoCommentNestedComponent } from './demo/nested';

import { BidiModule, Dir } from '@angular/cdk/bidi';
import { VtsCommentComponent } from './comment.component';
import { VtsCommentModule } from './comment.module';

describe('VtsCommentComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, VtsCommentModule, VtsListModule],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          VtsDemoCommentBasicComponent,
          VtsDemoCommentEditorComponent,
          VtsDemoCommentListComponent,
          VtsDemoCommentNestedComponent,
          VtsTestCommentRtlComponent
        ]
      }).compileComponents();
    })
  );

  describe('default', () => {
    it('should basic work', () => {
      const fixture = TestBed.createComponent(VtsDemoCommentBasicComponent);
      const component = fixture.componentInstance;
      const comment = fixture.debugElement.query(By.directive(VtsCommentComponent));
      fixture.detectChanges();

      expect(comment.nativeElement.classList).toContain('vts-comment');
      expect(comment.nativeElement.querySelector('vts-avatar[vts-comment-avatar]')).toBeTruthy();
      expect(comment.nativeElement.querySelector('vts-comment-content')).toBeTruthy();
      expect(comment.nativeElement.querySelector('.vts-comment-content-author-name')).toBeTruthy();
      expect(comment.nativeElement.querySelector('.vts-comment-content-author-time')).toBeTruthy();
      expect(
        comment.nativeElement.querySelector('.vts-comment-content-author-name').innerText
      ).toBe('Han Solo');
      expect(
        comment.nativeElement.querySelector('.vts-comment-content-author-time').innerText
      ).toBe(component.time);
    });

    it('should actions work', () => {
      const fixture = TestBed.createComponent(VtsDemoCommentBasicComponent);
      const component = fixture.componentInstance;
      const comment = fixture.debugElement.query(By.directive(VtsCommentComponent));
      fixture.detectChanges();

      expect(component.likes).toBe(0);
      expect(component.dislikes).toBe(0);
      expect(comment.nativeElement.classList).toContain('vts-comment');
      expect(comment.nativeElement.querySelectorAll('.vts-comment-actions li>span').length).toBe(3);
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .like').innerText
      ).toBe(component.likes.toString());
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .dislike').innerText
      ).toBe(component.dislikes.toString());

      component.like();
      fixture.detectChanges();

      expect(component.likes).toBe(1);
      expect(component.dislikes).toBe(0);
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .like').innerText
      ).toBe(component.likes.toString());
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .dislike').innerText
      ).toBe(component.dislikes.toString());

      component.dislike();
      fixture.detectChanges();

      expect(component.likes).toBe(0);
      expect(component.dislikes).toBe(1);
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .like').innerText
      ).toBe(component.likes.toString());
      expect(
        comment.nativeElement.querySelector('.vts-comment-actions li>span .dislike').innerText
      ).toBe(component.dislikes.toString());
    });

    it('should list work', () => {
      const fixture = TestBed.createComponent(VtsDemoCommentListComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      let comments = fixture.debugElement.queryAll(By.directive(VtsCommentComponent));
      fixture.detectChanges();
      expect(component.data.length === comments.length).toBeTruthy();

      component.data.forEach((e, i) => {
        const comment = comments[i];
        expect(comment.nativeElement.querySelector('vts-avatar[vts-comment-avatar]')).toBeTruthy();
        expect(
          comment.nativeElement.querySelector('.vts-comment-content-author-name').innerText
        ).toBe(e.author);
        expect(comment.nativeElement.querySelector('.vts-comment-content-detail p').innerText).toBe(
          e.content
        );
        expect(
          comment.nativeElement.querySelector('.vts-comment-content-author-time').innerText
        ).toBe(e.datetime);
      });

      component.data = [{ ...component.data[0] }];
      fixture.detectChanges();
      comments = fixture.debugElement.queryAll(By.directive(VtsCommentComponent));
      expect(component.data.length === comments.length).toBeTruthy();
    });

    it('should editor work', fakeAsync(() => {
      const fixture = TestBed.createComponent(VtsDemoCommentEditorComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('vts-comment .vts-comment-content-detail textarea'))
      ).toBeTruthy();
      let comments = fixture.debugElement.queryAll(By.css('vts-list vts-comment'));
      expect(component.data.length).toBe(0);
      expect(component.data.length === comments.length).toBeTruthy();

      component.inputValue = 'Test Comment 0';
      component.handleSubmit();
      tick(1000);
      fixture.detectChanges();

      component.inputValue = 'Test Comment 1';
      component.handleSubmit();
      tick(1000);
      fixture.detectChanges();

      comments = fixture.debugElement.queryAll(By.css('vts-list vts-comment'));

      component.data.forEach((e, i) => {
        const comment = comments[i];
        expect(comment.nativeElement.querySelector('vts-avatar[vts-comment-avatar]')).toBeTruthy();
        expect(
          comment.nativeElement.querySelector('.vts-comment-content-author-name').innerText
        ).toBe(e.author);
        expect(comment.nativeElement.querySelector('.vts-comment-content-detail p').innerText).toBe(
          e.content
        );
        expect(
          comment.nativeElement.querySelector('.vts-comment-content-author-time').innerText
        ).toBe(e.displayTime);
      });
    }));

    it('should nested work', () => {
      const fixture = TestBed.createComponent(VtsDemoCommentNestedComponent);
      fixture.detectChanges();

      const rootComment = fixture.debugElement.query(By.directive(VtsCommentComponent));
      expect(rootComment.nativeElement).toBeTruthy();

      const levelTwoComment = rootComment.query(By.directive(VtsCommentComponent));
      expect(levelTwoComment.nativeElement).toBeTruthy();

      const levelThreeComments = levelTwoComment.queryAll(By.directive(VtsCommentComponent));
      expect(levelThreeComments.length).toBe(2);
    });
  });

  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestCommentRtlComponent);
      const comment = fixture.debugElement.query(By.directive(VtsCommentComponent));
      fixture.detectChanges();
      expect(comment.nativeElement.classList).toContain('vts-comment-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(comment.nativeElement.classList).not.toContain('vts-comment-rtl');
    });
  });
});

@Component({
  template: `
    <div [dir]="direction">
      <vts-demo-comment-basic></vts-demo-comment-basic>
    </div>
  `
})
export class VtsTestCommentRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
