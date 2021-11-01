import React, {useState, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';



const Pagination=({ totalRecordsRx = null, pageLimitRx = 30, pageNeighboursRx = 0 , onPageChanged})=> {
  const LEFT_PAGE_ENABLED = 'LEFT_ENABLED';
  const RIGHT_PAGE_ENABLED = 'RIGHT_ENABLED';
  const LEFT_PAGE_DISABLED = 'LEFT_DISABLED';
  const RIGHT_PAGE_DISABLED = 'RIGHT_DISABLED';
  let pageLimit = typeof pageLimitRx === 'number' ? pageLimitRx : 30;
  let totalRecords = typeof totalRecordsRx === 'number' ? totalRecordsRx : 0;

  // pageNeighbours can be: 0, 1 or 2
  let pageNeighbours = typeof pageNeighboursRx === 'number'
    ? Math.max(0, Math.min(pageNeighboursRx, 2))
    : 0;

  let totalPages = Math.ceil(totalRecords / pageLimit);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    gotoPage(1, onPageChanged);
  }, []);

  const fetchPageNumbers = () => {

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE_ENABLED, 1, '...', ...extraPages, ...pages, totalPages, RIGHT_PAGE_DISABLED];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [LEFT_PAGE_DISABLED, 1, ...pages, ...extraPages, '...', totalPages, RIGHT_PAGE_ENABLED];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE_ENABLED, 1, '...', ...pages, '...', totalPages, RIGHT_PAGE_ENABLED];
          break;
        }
      }

      return pages;
    }

    return range(1, totalPages);
  }

  /**
   * Helper method for creating a range of numbers
   * range(1, 5) => [1, 2, 3, 4, 5]
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  }


  const gotoPage = (page, onPageChanged) => {
     setCurrentPage(Math.max(0, Math.min(page, totalPages)));
    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords
    };

    //setState({ currentPage }, () => onPageChanged(paginationData));
  }

  const handleClick = page => evt => {
    evt.preventDefault();
    gotoPage(page);
  }

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(currentPage - (pageNeighbours * 2) - 1);
  }

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(currentPage + (pageNeighbours * 2) + 1);
  }

    if (!totalRecords || totalPages === 1) return null;

    const pages = fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE_ENABLED || page === LEFT_PAGE_DISABLED) return (
                <li key={index} className={`page-item${ LEFT_PAGE_DISABLED === page ? ' active' : ''}`} >
                  <a className="page-link"  href="#" aria-label="Previous" onClick={handleMoveLeft}>
                    <span className="sr-only">Previous</span>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              );

              if (page === RIGHT_PAGE_ENABLED || page === RIGHT_PAGE_DISABLED) return (
                <li key={index} className={`page-item${ RIGHT_PAGE_DISABLED === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              );

              if( page === '...' )  return ( ' . . . ' );

              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" onClick={ handleClick(page) }>{ page }</a>
                </li>
              );
            }) }
          </ul>
        </nav>
      </Fragment>
    );
}

Pagination.propTypes = {
  totalRecordsRx: PropTypes.number.isRequired,
  pageLimitRx: PropTypes.number,
  pageNeighboursRx: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
