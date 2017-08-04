class PageUtils {
  of({ data, pageNumber, pageSize, totalRecords }) {
    return { data, pageNumber, pageSize, totalRecords };
  }
}

module.exports = new PageUtils();
