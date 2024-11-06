const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
export const ENDPOINT = {
  GET_HOME: `${BASE_URL}/api/trang-chu`,
  GET_INTRO: `${BASE_URL}/api/intro`,
  GET_FOOTER: `${BASE_URL}/api/footer`,
  GET_VE_CHUNG_TOI: `${BASE_URL}/api/ve-chung-toi`,
  GET_DICH_VU: `${BASE_URL}/api/dich-vu`,
  GET_BANG_GIA: `${BASE_URL}/api/bang-gia`,
  GET_PAGE_TIN_TUC: `${BASE_URL}/api/tin-tuc-page`,
  GET_TIN_TUC: `${BASE_URL}/api/tin-tucs`,
  GET_LIEN_HE: `${BASE_URL}/api/lien-he`,
  GET_KHACH_HANG: `${BASE_URL}/api/khach-hangs`,
  GET_HOTLINE: `${BASE_URL}/api/hot-line`,
};
