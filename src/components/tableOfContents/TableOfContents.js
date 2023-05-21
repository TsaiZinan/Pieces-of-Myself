import React from 'react'
import { Link } from 'react-router-dom';

import './TableOfContents.css';

import MdDisplay from '../mdDisplay/MdDisplay';

import title from '../../blogs/title.md'
import short from '../../blogs/short.md'

import config from '../../config';


const TableOfContents = props => {


  // read the files name list of blog folder
  // https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
  const webpackContext = require.context('../../blogs/', false, /\.md$/);
  // console.log(webpackContext)


  const tableOfContentsHandle = () => {

    // get all files into mdFiles
    function importAll(r) {
      let mdFiles = {};
      r.keys().map(item => { mdFiles[item.replace('./', '')] = r(item); });
      // console.log(mdFiles)
      return mdFiles;
    }

    const mdFiles = importAll(webpackContext);
    // console.log('----------1.1-----------')
    // console.log(importAll(webpackContext))


    // remove the file without the name formating of 'yyyymmdd-'
    let filtedFilenames = Object.keys(mdFiles).filter(key => /\d{8}[-]{1}/.test(key)).reduce((acc, key) => {
      acc[key] = mdFiles[key];
      return acc;
    }, {});
    // console.log('----------1.2-----------')
    // console.log(filtedFilenames)

    // add keys to objects
    // https://stackoverflow.com/a/44407980/20787775
    var filenameObjectWithKey = Object.entries(filtedFilenames).map(obj => ({
      Year: obj[0].slice(0, 4),
      Month: obj[0].slice(4, 6),
      Day: obj[0].slice(6, 8),
      Date: obj[0].slice(0, 8),
      Title: obj[0].slice(9, -3),
      path: obj[0],
      link: obj[1] + '/#top'
    }));

    // console.log('----------1.5-----------')
    // console.log(filenameObjectWithKey)

    // remove '/Pieces-of-Myself' from each link
    const filenameObjectWithKeyAndLink = filenameObjectWithKey.map(item => {
      item.link = item.link.replace('/Pieces-of-Myself', '');
      return item;
    });

    // console.log('----------1.6-----------')
    // console.log(filenameObjectWithKeyAndLink)



    // group text name list by year
    // https://stackoverflow.com/a/40774906/20787775
    var filenameObjectWithKeyGroupByYear = filenameObjectWithKeyAndLink.reduce(function (r, a) {
      r[a.Year] = r[a.Year] || [];
      r[a.Year].push(a);
      return r;
    }, Object.create(null));

    // console.log('filenameObjectWithKeyGroupByYear:')
    // console.log(filenameObjectWithKeyGroupByYear)


    // group text name list by month
    const addMonth = (input) => {
      let newObject = {}
      Object.entries(input).forEach(([key, val]) => {
        // console.log(key); // the name of the current key.
        // console.log(val); // the value of the current key.

        let mon = val.reduce(function (r, a) {
          r[a.Month] = r[a.Month] || [];
          r[a.Month].push(a);
          // console.log(a.Month)
          return r;
        }, Object.create(null));

        // console.log(mon)
        newObject[key] = [mon];
        // console.log('val-after')
        // console.log(val)
      });

      return newObject;
    }


    let finalObject = addMonth(filenameObjectWithKeyGroupByYear)

    // console.log('----------FINAL-----------')
    // console.log(finalObject)

    return finalObject;
  }

  // convert number to month 
  // default: en
  const getMonthName = (month, language = 'en') => {
    const months = {
      en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    };

    month = Number(month);
    if (isNaN(month) || month < 1 || month > 12) return 'ERR';
    if (!months[language]) return 'ERR';
    return months[language][month - 1];
  }


  const dataBlock = (date) => {

    let month = date.slice(4, 6);
    let day = date.slice(6, 8);




    return (
      <div className='tableOfContents-title-block-dateBlock'>
        <div className='tableOfContents-title-block-dateBlock-month'>
          {getMonthName(month, 'en')}
        </div>
        <div className='tableOfContents-title-block-dateBlock-day'>
          {day}
        </div>
      </div>
    )
  }




  return (
    <div className='tableOfContents'>
      <div className='tableOfContents-about'>
        {<MdDisplay inputMdText={title} />}
      </div>

      {config.isShort === true ?
        <div>
          <div className='tableOfContents-short-title'>
            <Link to='/short' className='tableOfContents-short-title-link'>
              Short
            </Link>
          </div>
          <div className='tableOfContents-short'>

            {<MdDisplay inputMdText={short} />}
          </div>
        </div>
        : null}





      {
        // display the year by descending
        Object.keys(tableOfContentsHandle()).sort().reverse().map((year, yearIndex) => {
          // console.log(year);
          // console.log(tableOfContentsHandle()[year][0]);
          return (
            <div className='tableOfContents-main'>
              <div className='tableOfContents-year'>
                {year}
              </div>

              {/* display the month by descending */}
              {Object.keys(tableOfContentsHandle()[year][0]).sort().reverse().map((month, monthIndex) => {
                // console.log(month);
                // console.log(tableOfContentsHandle()[year][0][month]);
                return (
                  <div className='tableOfContents-month-block'>
                    {/* <div className='tableOfContents-month'>
                      {monthConverter(month, 0)}
                    </div> */}

                    {/* display the title by date descending */}
                    {tableOfContentsHandle()[year][0][month].reverse().map((title, titleIndex) => {
                      // console.log(title);
                      // console.log(tableOfContentsHandle()[year][0][month][0].Title);
                      return (
                        <div className='tableOfContents-title-block'>
                          {dataBlock(title.Date)}
                          <Link to={title.link} className='tableOfContents-title'>
                            {title.Title}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
    </div>
  )
}

export default TableOfContents