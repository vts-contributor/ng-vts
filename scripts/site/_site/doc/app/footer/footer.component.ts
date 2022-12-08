import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="rc-footer rc-footer-dark">
      <section class="rc-footer-bottom">
        <div class="rc-footer-bottom-container">
          <p>Trang thể hiện một số ví dụ mẫu về thiết kế theo tiêu chuẩn Design System.</p>
        </div>
      </section>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
