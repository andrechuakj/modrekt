import React, { useEffect } from 'react';
import _ from 'lodash';
import { Constraint } from 'types/constraint';
import classnames from 'classnames';
import styles from './Announcements.scss';
import { EndTime, StartTime } from 'types/modules';
import { useSelector } from 'react-redux';
import { getSemesterTimetableLessons } from 'selectors/timetables';
import { State } from 'types/state';
import { hydrateSemTimetableWithLessons } from 'utils/timetables';
import { useParams } from 'react-router-dom';

const ConstraintCard: React.FC<Constraint> = (constraint: Constraint) => {
  function check(start: StartTime, end: EndTime, day: string) {
    return constraint.startTime === start && constraint.endTime === end && constraint.day === day;
  }

  type Params = {
    action: string;
    semester: string;
  };
  const semester = Number.parseInt(useParams<Params>().semester[4]);
  const timetable = useSelector(getSemesterTimetableLessons)(semester);
  const modules = useSelector(({ moduleBank }: State) => moduleBank.modules);
  const [isSatisfied, setIsSatisfied] = React.useState<boolean>(false);

  const timetableWithLessons = hydrateSemTimetableWithLessons(timetable, modules, semester);

  function checkConstraint(): void {
    for (const [modname, val] of Object.entries(timetableWithLessons)) {
      for (const [lessonType, value] of Object.entries(val)) {
        for (let i = 0; i < value.length; i++) {
          if (check(value[i].startTime, value[i].endTime, value[i].day)) {
            setIsSatisfied(true);
            return;
          }
        }
      }
    }
    setIsSatisfied(false);
  }

  useEffect(() => {
    checkConstraint();
  }, [timetable, modules, constraint]);
  useEffect(() => {
    checkConstraint();
  }, []);

  return (
    <>
      {isSatisfied && (
        <div className={classnames('alert-success', 'alert no-export')}>
          <h3>Constraint {constraint.index}</h3>
          <p className={styles.bodyElement}>
            Find a module that occupies the time between {constraint.startTime} and{' '}
            {constraint.endTime} on {constraint.day}!
          </p>
        </div>
      )}
      {!isSatisfied && (
        <div className={classnames('alert-danger', 'alert no-export')}>
          <h3>Constraint {constraint.index}</h3>
          <p className={styles.bodyElement}>
            Find a module that occupies the time between {constraint.startTime} and{' '}
            {constraint.endTime} on {constraint.day}!
          </p>
        </div>
      )}
    </>
  );
};

export default ConstraintCard;
