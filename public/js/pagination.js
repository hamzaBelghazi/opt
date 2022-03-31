let params = new URL(document.location).searchParams;
let currentPage = Number(params.get('page')) || 1;
const url = document.location;

const pagesCount = Math.ceil(
  Number(document.querySelector('.results__count').textContent) / 9
);
const element = document.querySelector('.pagination ul');
let totalPages = pagesCount;
let page = currentPage;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  const url = document.location;

  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  let hrefPrev, hrefNext;
  let hrefLengh;

  if (!url.search.includes('page') && url.search.trim() !== '') {
    hrefPrev = `${url.origin}${url.pathname}${url.search}&page=${
      currentPage - 1
    }`;
    hrefNext = `${url.origin}${url.pathname}${url.search}&page=${
      currentPage + 1
    }`;
    hrefLengh = `${url.origin}${url.pathname}${url.search}&page=`;
  }
  if (url.search.includes('page') && url.search.trim() !== '') {
    const query = url.search.split('&');
    const search = query.filter(
      (q) => !q.startsWith('?page') && !q.startsWith('page')
    );
    console.log(search);
    hrefPrev = `${url.origin}${url.pathname}${search.join('&')}?page=${
      currentPage - 1
    }`;
    hrefNext = `${url.origin}${url.pathname}${search.join('&')}?page=${
      currentPage + 1
    }`;
    hrefLengh = `${url.origin}${url.pathname}${search.join('&')}?page=`;
  }

  if (url.search.trim() === '') {
    hrefPrev = `${url.origin}${url.pathname}?page=${currentPage - 1}`;
    hrefNext = `${url.origin}${url.pathname}?page=${currentPage + 1}`;
    hrefLengh = `${url.origin}${url.pathname}?page=`;
  }

  if (page > 1) {
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><a = href="${hrefPrev}" ><span><i class="fas fa-angle-left"></i> Prev</span></a></li>`;
  }

  if (page > 2) {
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  // if (page == totalPages) {
  //   beforePage = beforePage - 2;
  // } else if (page == totalPages - 1) {
  //   beforePage = beforePage - 1;
  // }
  // if (page == 1) {
  //   afterPage = afterPage + 2;
  // } else if (page == 2) {
  //   afterPage = afterPage + 1;
  // }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (currentPage == plength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><a href="${hrefLengh}${plength}"><span>${plength}</span></a></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><a href="${hrefNext}"><span>Next <i class="fas fa-angle-right"></i></span></a></li>`;
  }
  element.innerHTML = liTag;
  return liTag;
}

// const filterInputs = document.querySelectorAll('input[type="checkbox"]');
// filterInputs.forEach((i) => {
//   console.log(i.getAttribute('name'));
// });
// let filter = JSON.parse(localStorage.getItem('filterState'));
// console.log(filter);
