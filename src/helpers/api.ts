function getCookie(name: string) {
  //   var matches = document.cookie.match(
  //     new RegExp(
  //       "(?:^|; )" +
  //         name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
  //         "=([^;]*)"
  //     )
  //   );
  //   return matches ? decodeURIComponent(matches[1]) : undefined;
  return document.cookie.match(/sessionid=(.+?)(;|$)/);
}
export function addServerErrors(
  errors: object,
  setError: (
    fieldName: string,
    error: { type: string; message: any }
  ) => void
) {
    // Object.keys(errors).forEach(key=>{
    //     setError(key,{
    //         type:"server",
    //         message:errors[key]
    //     })
    // })
}
export const sessionId = getCookie("sessionid");
