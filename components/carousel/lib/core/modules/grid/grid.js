export default function Grid({ Carousel, extendParams }) {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column',
    },
  });

  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;

  const initSlides = (slidesLength) => {
    const { vtsSlidesPerView } = Carousel.params;
    const { rows, fill } = Carousel.params.grid;
    slidesPerRow = slidesNumberEvenToRows / rows;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (vtsSlidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, vtsSlidesPerView * rows);
    }
  };

  const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
    const { slidesPerGroup, vtsSpaceBetween } = Carousel.params;
    const { rows, fill } = Carousel.params.grid;
    // Set slides order
    let newSlideOrderIndex;
    let column;
    let row;
    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup =
        groupIndex === 0
          ? slidesPerGroup
          : Math.min(
              Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows),
              slidesPerGroup,
            );
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;

      newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / rows;
      slide.css({
        '-webkit-order': newSlideOrderIndex,
        order: newSlideOrderIndex,
      });
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || (column === numFullColumns && row === rows - 1)) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.css(
      getDirectionLabel('margin-top'),
      row !== 0 ? vtsSpaceBetween && `${vtsSpaceBetween}px` : '',
    );
  };

  const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
    const { vtsSpaceBetween, centeredSlides, roundLengths } = Carousel.params;
    const { rows } = Carousel.params.grid;
    Carousel.virtualSize = (slideSize + vtsSpaceBetween) * slidesNumberEvenToRows;
    Carousel.virtualSize = Math.ceil(Carousel.virtualSize / rows) - vtsSpaceBetween;
    Carousel.$wrapperEl.css({
      [getDirectionLabel('width')]: `${Carousel.virtualSize + vtsSpaceBetween}px`,
    });
    if (centeredSlides) {
      snapGrid.splice(0, snapGrid.length);
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < Carousel.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.push(...newSlidesGrid);
    }
  };

  Carousel.grid = {
    initSlides,
    updateSlide,
    updateWrapperSize,
  };
}
