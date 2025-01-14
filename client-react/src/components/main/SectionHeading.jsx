import PropTypes from 'prop-types';
import styles from '@/styles/main/SectionHeading.module.css';
import { useUtils } from '@/contexts/UtilsContext';
import { usePrefsData } from '@/contexts/PrefsContext';

function getSubTitle(section, timestamp, timezone, df, lang) {
  let subtitle = '';

  switch (section) {
    case 'current':
      subtitle = `${df.formatDayOfWeekShort(
        timestamp,
        lang
      )} ${df.formatDayOfMonth(timestamp)} ${df.formatMonth(
        timestamp,
        lang
      )} ${df.formatTime(timestamp)}`;
      return subtitle;
    case 'forecast':
      return <span>&nbsp;</span>;
    case 'hourly':
      return timezone;
    default:
      return '';
  }
}

export default function SectionHeading({
  section,
  titleTranslationId,
  timestamp,
  timezone,
  subtitleTestId,
}) {
  console.log(`SectionHeading ${section} rendered!`);
  const { lang } = usePrefsData();
  const { getTranslation, df } = useUtils();

  const subtitle = getSubTitle(section, timestamp, timezone, df, lang);

  return (
    <>
      <div
        className={styles.sectionTitle}
        data-translation={titleTranslationId}
        data-testid="section-title"
      >
        {getTranslation(titleTranslationId, lang)}
      </div>
      <div className={styles.sectionSubtitle} data-testid={subtitleTestId}>
        {subtitle}
      </div>
    </>
  );
}

SectionHeading.propTypes = {
  section: PropTypes.oneOf(['current', 'forecast', 'hourly']).isRequired,
  titleTranslationId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  timezone: PropTypes.string.isRequired,
  subtitleTestId: PropTypes.string.isRequired,
};
