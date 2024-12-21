import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import { memo } from 'react';
import Lightbox, {
  type LightboxExternalProps,
} from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Share from 'yet-another-react-lightbox/plugins/share';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const CustomLightbox = (props: LightboxExternalProps) => {
  return (
    <Lightbox
      plugins={[
        Captions,
        Counter,
        Fullscreen,
        Slideshow,
        Share,
        Thumbnails,
        Video,
        Download,
        Zoom,
      ]}
      {...props}
    />
  );
};

export default memo(CustomLightbox);
