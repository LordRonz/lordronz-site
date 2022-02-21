export enum OGType {
  general,
  gradient,
  blog,
  personal,
}

export type OpenGraphType = {
  siteName: string;
  description: string;
  type?: keyof typeof OGType;
  templateTitle?: string;
  logo?: string;
  logoWidth?: string;
};

export const openGraph = ({
  siteName,
  templateTitle,
  description,
  type = 'general',
  logo = 'https://lordronz.vercel.app/images/logo.jpg',
  logoWidth = '100',
}: OpenGraphType): string => {
  const ogLogo = encodeURIComponent(logo.trim());
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());
  const ogLogoWidth = encodeURIComponent(logoWidth.trim());
  const ogType = Object.keys(OGType).includes(type.trim())
    ? type.trim()
    : 'general';

  return `https://lr-og.vercel.app/api/${ogType}?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}&logoWidth=${ogLogoWidth}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
};

export default openGraph;
