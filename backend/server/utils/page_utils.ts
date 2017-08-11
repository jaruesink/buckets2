type PageType = {
  data: string;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

interface Of {
    of(PageType): PageType;
}

class PageUtils implements Of {
  of({ data, pageNumber, pageSize, totalRecords }: PageType) {
    return { data, pageNumber, pageSize, totalRecords };
  }
}

export default new PageUtils();