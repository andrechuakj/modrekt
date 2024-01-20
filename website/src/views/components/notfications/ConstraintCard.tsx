import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Constraint } from 'types/constraint';
import classnames from 'classnames';
import styles from './Announcements.scss';
import { Day, EndTime, StartTime } from 'types/modules';
import { useSelector } from 'react-redux';
import { getSemesterTimetableColors, getSemesterTimetableLessons } from 'selectors/timetables';
import { getModuleCondensed } from 'selectors/moduleBank';
import { State } from 'types/state';
import {
  deserializeTimetable,
  hydrateSemTimetableWithLessons,
  timetableLessonsArray,
} from 'utils/timetables';
import { useLocation, useParams } from 'react-router-dom';
import ModuleTombstone from 'views/timetable/ModuleTombstone';

const ConstraintCard: React.FC<Constraint> = (constraint: Constraint) => {
  function check(start: StartTime, end: EndTime, day: string) {
    return constraint.startTime === start && constraint.endTime === end && constraint.day === day;
  }

  // constraint.satisfied =

  type Params = {
    action: string;
    semester: string;
  };
  const params = useParams<Params>();
  // console.log('params', params);
  const timetable = useSelector(getSemesterTimetableLessons)(1);
  // const colors = useSelector(getSemesterTimetableColors)(1);
  // const getModule = useSelector(getModuleCondensed);
  const modules = useSelector(({ moduleBank }: State) => moduleBank.modules);
  const [isSatisfied, setIsSatisfied] = React.useState<boolean>(false);
  const [isFound, setIsFound] = React.useState<boolean>(false);
  // const inshallah = timetableLessonsArray(timetable);
  // const location = useLocation();
  // console.log('location', location);
  // const [importedTimetable, setImportedTimetable] = useState(() =>
  //   params.action ? deserializeTimetable(location.search) : null,
  // );

  // console.log(timetable);
  // console.log(colors);
  // console.log(getModule('CS1101S'));
  // console.log(modules);
  // console.log(importedTimetable);

  const timetableWithLessons = hydrateSemTimetableWithLessons(timetable, modules, 1);
  // console.log('please', timetableWithLessons);

  function checkConstraint(): void {
    console.log('HEOEKOADKAEODK');
    for (const [modname, val] of Object.entries(timetableWithLessons)) {
      // console.log(modname, val);
      if (isFound) {
        break;
      }
      for (const [lessonType, value] of Object.entries(val)) {
        // console.log(lessonType, value);
        if (isFound) {
          break;
        }
        for (let i = 0; i < value.length; i++) {
          if (isFound) {
            break;
          }
          console.log('properties', value[i]);
          console.log(value[i].startTime, constraint.startTime);
          console.log(value[i].endTime, constraint.endTime);
          console.log(value[i].day, constraint.day);
          if (check(value[i].startTime, value[i].endTime, value[i].day)) {
            setIsSatisfied(true);
            setIsFound(true);
            break;
          }
        }
      }
    }
  }

  useEffect(() => checkConstraint(), []);
  useEffect(() => checkConstraint(), [useSelector(getSemesterTimetableLessons)(1)]);
  useEffect(() => checkConstraint(), [useStore().getState().undoHistory.present]);
  // useEffect(() => checkConstraint(), [ModuleTombstone]);

  console.log(isFound);
  console.log(isSatisfied);

  return (
    <>
      {isSatisfied ? (
        <div className={classnames('alert-success', 'alert no-export')}>
          <h3>Constraint {constraint.index}</h3>
          <p className={styles.bodyElement}>
            Find a module that occupies the time between {constraint.startTime} and{' '}
            {constraint.endTime} on {constraint.day}!
          </p>
        </div>
      ) : (
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
