export function getQueryString(name: string) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export function formatAccount(v: string, start = 4, end = 6) {
  return v?.substring(0, start) + "****" + v?.substring(v.length - end);
}
