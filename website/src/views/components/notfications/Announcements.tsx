import { memo, useState, useCallback } from 'react';
import classnames from 'classnames';
import { Heart } from 'react-feather';

import storage from 'storage';
import { announcementKey } from 'storage/keys';
import CloseButton from 'views/components/CloseButton';
import styles from './Announcements.scss';
import CarouselItem from './CarouselItem.jsx';

/**
 * If false, hides announcement.
 */
const enableAnnouncements = true;

/**
 * Unique key for the current announcement. If the announcement is not
 * dismissible, set the key to null. Otherwise, set it to a string.
 *
 * Previous keys:
 * - 'ay202324-new-data' - AY2023/24 data is available
 * - 'ay202223-new-data' - AY2022/23 data is available
 * - 'vercel-migration-120522' - Announcement for possible outage for
 *                               migration out of Vercel team plan
 * - 'ay202122-2107-search-outage' - Module search outage apology
 * - 'ay202122-new-data' - AY2021/22 data is available
 * - 'ay202021-new-data' - AY2020/21 data is available
 * - 'ay201920-new-data' - AY2019/20 data is available
 * - 'nusmods-is-official' - NUSMods switch to official APIs
 * - 'nusmods-r-announcement' - NUSMods R announcement message
 * - 'ay201819-new-data' - AY2018/19 data is available
 * - 'ay201819-s2-new-data' - S2 data available
 */
const key = announcementKey('ay202324-new-data');

const Announcements = memo(() => {
  const [isOpen, setIsOpen] = useState(() => {
    if (!enableAnnouncements) return false;
    if (key) return !storage.getItem(key);
    return true;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === requirements.length - 1 ? 0 : prevIndex + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? requirements.length - 1 : prevIndex - 1));
  };

  const requirements = [
    { title: 'Requirement 1', text: 'Find a mod between 2 to 3 pm' },
    { title: 'Requirement 2', text: 'Find a mod of level 3000' },
    { title: 'Requirement 3', text: 'Find a mod from FASS' },
  ];

  return (
    <div
      className={classnames(
        'alert alert-success no-export',
        styles.announcement,
        // styles.wrapButtons, // Uncomment if needed
      )}
    >
      <Heart className={styles.backgroundIcon} />
      <button className="btn btn-link" onClick={prevSlide}>
        &lt;
      </button>
      <CarouselItem
        requirements={requirements}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <button className="btn btn-link" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
});

export default Announcements;
