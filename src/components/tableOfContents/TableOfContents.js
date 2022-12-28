import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import ArticlePage from '../articlePage/ArticlePage';

const TableOfContents = props => {


  // read the files name list of blog folder
  // https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
  const webpackContext = require.context('../../blogs/', false, /\.md$/)
  // console.log(webpackContext.keys());
  // console.log(webpackContext.values());
  const filenames = webpackContext.keys()

  const tableOfContentsHandle = () => {

    // read the files name list of blog folder and remove the './'
    // https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
    // const webpackContext1 = require.context('../../blogs/', false, /\.md$/)
    let filenames = webpackContext.keys().map(s => s.slice(2));

    // console.log('----------1-----------')
    // console.log(filenames)



    function importAll(r) {
      let mdFiles = {};
      r.keys().map(item => { mdFiles[item.replace('./', '')] = r(item); });
      return mdFiles;
    }

    const mdFiles = importAll(webpackContext);
    console.log('----------1.1-----------')
    console.log(importAll(webpackContext))


    let test2 = Object.keys(mdFiles).filter(key => /\d{6}[-]{1}/.test(key)).reduce((acc, key) => {
      acc[key] = mdFiles[key];
      return acc;
    }, {});
    // console.log('----------1.2-----------')
    // console.log(test2)

    var filenameObjectWithKey5 = Object.entries(test2).map(obj => ({
      Year: obj[0].slice(0, 2),
      Month: obj[0].slice(2, 4),
      Day: obj[0].slice(4, 6),
      Date: obj[0].slice(0, 6),
      Title: obj[0].slice(7, -3),
      path: obj[0],
      link: obj[1]
    }));

    // console.log('----------1.5-----------')
    // console.log(filenameObjectWithKey5)

    // let mdFilesWithDate = mdFiles.filter(item => /\d{6}[-]{1}/.test(item));

    // console.log(Object.values(mdFiles));











    // order name list, nor sure if it work
    // console.log(filenames)
    let orderedFilenames = filenames.sort();
    // console.log('----------2-----------')
    // console.log(orderedFilenames)

    // remove the file without the name formating of 'yymmdd-'
    let filtedFilenames = orderedFilenames.filter(item => /\d{6}[-]{1}/.test(item));
    // console.log('----------3-----------')
    // console.log(filtedFilenames);

    // spilt the file name to object
    // https://stackoverflow.com/a/72917891/20787775
    let filenameObject = Object.fromEntries(filtedFilenames.map((t) => [t.toString().substr(0, 6), t.toString().substr(7)]))
    // console.log('----------4-----------')
    // console.log(filenameObject)





    // add keys to objects
    // https://stackoverflow.com/a/44407980/20787775
    var filenameObjectWithKey = Object.entries(filenameObject).map(obj => ({
      Year: obj[0].slice(0, 2),
      Month: obj[0].slice(2, 4),
      Day: obj[0].slice(4, 6),
      Date: obj[0],
      Title: obj[1].slice(0, -3),
      path: obj[0] + '-' + obj[1]
    }));

    // console.log('----------5-----------')
    // console.log(filenameObjectWithKey)

    // group text name list by year
    // https://stackoverflow.com/a/40774906/20787775
    var filenameObjectWithKeyGroupByYear = filenameObjectWithKey5.reduce(function (r, a) {
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

    // console.log(filenameObject)
    // console.log('----------FINAL-----------')
    // console.log(finalObject)
    // return filenameObject;
    return finalObject;
  }





  return (
    <div>
      {/* <p>111</p> */}
      {/* {console.log(tableOfContentsHandle())} */}
      {
        // display the year by descending
        Object.keys(tableOfContentsHandle()).sort().reverse().map((year, yearIndex) => {
          // console.log(year);
          // console.log(tableOfContentsHandle()[year][0]);
          return (
            <div>
              {'Year: ' + year}

              {
                // display the month by descending
                Object.keys(tableOfContentsHandle()[year][0]).sort().reverse().map((month, monthIndex) => {
                  // console.log(month);
                  // console.log(tableOfContentsHandle()[year][0][month]);
                  return (
                    <div>
                      {'Month: ' + month}

                      {
                        // display the title by date descending
                        tableOfContentsHandle()[year][0][month].reverse().map((title, titleIndex) => {
                          // console.log(title);
                          // console.log(tableOfContentsHandle()[year][0][month][0].Title);
                          return (
                            <div>
                              

                              <Link to={title.link}>
                              {title.Date + ' : ' + title.Title + ' * ' + title.link}
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