// for the url '/bonsai/name-of-bonsai'
export interface Bonsai {
  fname: string;     // the filename (basename) of the markdown file
  route: string;     // the route is '/bonsai/name-of-bonsai'
  slug: string;      // the slug is 'name-of-bonsai'
  title: string;     // the title is 'name-of-bonsai'
                     // (which is the same as the slug,
                     //  which is the sluggified fname -- maybe 'Name of Bonsai')
  markdown?: string; // the markdown is the file content
}
