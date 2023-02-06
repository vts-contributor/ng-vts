import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-fallback',
  template: `
    <img vts-image width="200px" height="200px" vtsSrc="error" [vtsFallback]="fallback" alt="" />
  `
})
export class VtsDemoImageFallbackComponent {
  fallback =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAIAAACUOFjWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR5SURBVHhe7drrcds4FAZQ9+N63I/rST3px0sQIARcApRiWyJn9pwfO3hdgEt8IzlO3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AXvn3+/Rv58lAW/Kp329/O99L7v4095wt/acGi4+VNPZPXad/zroXwq+TuJUM4J5UkOX3ya/PO5/Cd/oYfutqKoIRks23SnjWoXzfCiebaUxDL2ufv6zo2P4ZZNYVrQP1LWH1pW1M0XeY9l4v6JbRnfcfgG02RzvaGb+80FlnZc1khT+bRJbf8Z2Eyk8V1Amg3XpXXF/cJW3SSrxf3mpawfHJ3IT+VXG5VXHd506Hb5aboH95Om1r2nte/5jovJ+tsJdUE49G5hK43uBhd5k/WzsLyQOnhwIj92+C7DZOgu991W1tmDLevUrDZLSarSeNwy9dc81ImwYutOC3u3A9vJtLgYhC9sHU/i+w7f5fF7f0ooczy2uW08bpn6vxnKTQ1n3Ty10mjdpO4Yto4n8X2H7/L4vXd3lbt9UPbq1Kx2abSldVldkNVu3XD2qLPCI9ui255ppOx+90R+7PBd3nnvqb9dcdM+2PI2Naltbj8Pb900sa1f27lTN7ztvLp12x2bwlYabgZHe6ZmGGxmk9DlB9a3PfDge2/K67UeXE83NardgrNaVrZ5qTPzXwmNH3VUGDSnlv/3xf5pl979E8MEHFvCJy+cLH0E1hiun3ajD0p4qTWJG4kEADhV97NZlX5Iq78DefYvQ94/Pkabb0/2tKPTn5b8NHpFDyTuqaGcbv78yAjlVV01lE89NBPKq5pffp3plqTOZnSjefH4n+U2tXm0GeieYXDIrraMNXW1mxt3/2nw7O+BOFu42Ea447Qkteo9jivXJXW8KWhrw/Do/G78sdraXZeMniElchvO6Sybcin5Ajvl2ro7Xhvx+270/ddEIJnV1m5dELTjD9bWbmrcf4awiusIF9vo7jg11luMYm3Yr3aXQLRLd5tH7fiDtffGw/DaF8orijd1U2dmlzoUFtWuUPKweFM3daY20tffeO1N2G9Wm7prIGbnt+MP1tbubLwWZqHLZYQLbAzuOLVuq0NWsrBfqC0ZaNuTaHT7HNVui9bx3Otq225a39YOT+Z04QIbdaZbkjqbUV3Yb1bbhCGnI8Yj7DOp7YeXndaSUNt1y2np4W+/EoqHAQAAAADARXx9fZUWXET+m5bSgSvIiZRLLqTGUS65ijaLcsklhCDKJefbp1AuOdkwgnLJmWb5k0tOcxA+ueQcx8mTS05wN3Zyyas9kjm55KUeDJxc8jqPp00ueZF/ippc8gr/mjO55OkOQrZMzZQV8AwhYW1X+DjHPoVyyclq7PaNhVByghy7ED655ExL5vaxa0f2s/Bcs8zJJZcjlFyRXHI5QskVySWXI5Rc0ZLFrPQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgf+nt7T87GTPAkR2qXwAAAABJRU5ErkJggg==';
}
