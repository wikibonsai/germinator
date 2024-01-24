// 'bonsai tree' / 'semantic tree'
// for the url '/tree/name-of-tree'
export interface Tree {
  fname: string;     // the filename (basename) of the markdown file
  route: string;     // the route is '/tree/name-of-tree'
  slug: string;      // the slug is 'name-of-tree'
  title: string;     // the title is 'name-of-tree'
                     // (which is the same as the slug,
                     //  which is the sluggified fname -- maybe 'Name of Bonsai')
  markdown?: string; // the markdown is the file content
}
