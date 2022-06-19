function getCookie(name: string) {

  return document.cookie.match(/sessionid=(.+?)(;|$)/);
}
export function addServerErrors(
  errors: object,
  setError: (
    fieldName: string,
    error: { type: string; message: any }
  ) => void
) {

}
export const sessionId = getCookie("sessionid");
