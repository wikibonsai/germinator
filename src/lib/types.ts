// for the url '/bonsai/name-of-bonsai'
export interface Bonsai {
  slug: string;      // the slug is 'name-of-bonsai'
  route: string;     // the route is '/bonsai/name-of-bonsai'
  title: string;     // the title is 'name-of-bonsai'
                     // (which is the same as the slug,
                     //  which is the sluggified fname -- maybe 'Name of Bonsai')
  markdown?: string; // the markdown is the file content
}
