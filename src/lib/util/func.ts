import { goto } from '$app/navigation';


export function goTo(url: string): () => void {
  // local url
  if (url.startsWith('/')) {
    return () => {
      console.debug('goto: ', url);
      goto(url);
    }
  // external url
  } else {
    console.debug('window.location.href: ', url);
    return () => window.location.href = url;
  }
}
