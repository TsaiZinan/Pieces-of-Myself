import React from 'react'
// import ReactMarkdown from 'react-markdown';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';
import ArticlePage from '../articlePage/ArticlePage';

// import about from '../../blogs/2022/新十条.md'
import about from '../../blogs/about.md'

// read the files name list of blog folder
// https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
const webpackContext = require.context('../../blogs/', false, /\.md$/)
const filenames = webpackContext.keys()

const tableOfContentsHandle = () => {

  // read the files name list of blog folder and remove the './'
  // https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
  const webpackContext = require.context('../../blogs/', false, /\.md$/)
  let filenames = webpackContext.keys().map(s => s.slice(2));

  // order name list, nor sure if it work
  // console.log(filenames)
  let orderedFilenames = filenames.sort();
  // console.log(orderedFilenames)

  // remove the file without the name formating of 'yymmdd-'
  let filtedFilenames = orderedFilenames.filter(item => /\d{6}[-]{1}/.test(item));
  // console.log(filtedFilenames);

  // spilt the file name to object
  // https://stackoverflow.com/a/72917891/20787775
  let filenameObject = Object.fromEntries(filtedFilenames.map((t) => [t.toString().substr(0, 6), t.toString().substr(7)]))
  console.log(filenameObject)





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

  console.log(filenameObjectWithKey)

  // group text name list by year
  // https://stackoverflow.com/a/40774906/20787775
  var filenameObjectWithKeyGroupByYear = filenameObjectWithKey.reduce(function (r, a) {
    r[a.Year] = r[a.Year] || [];
    r[a.Year].push(a);
    return r;
  }, Object.create(null));

  // console.log('filenameObjectWithKeyGroupByYear:')
  // console.log(filenameObjectWithKeyGroupByYear)



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

  // console.log(addMonth(filenameObjectWithKeyGroupByYear))


  let finalObject = addMonth(filenameObjectWithKeyGroupByYear)

  // console.log(filenameObject)
  // console.log(finalObject)
  // return filenameObject;
  return finalObject;
}


const HomePage = () => {




  return (
    <div className='Homepage'>
      <div>
        {Object.keys(tableOfContentsHandle()).sort().reverse().map((year, yearIndex) => {
          // console.log(year);
          // console.log(tableOfContentsHandle()[year][0]);
          return (
            <div>
              {'Year: '+year}

              {Object.keys(tableOfContentsHandle()[year][0]).sort().reverse().map((month, monthIndex) => {
                // console.log(month);
                // console.log(tableOfContentsHandle()[year][0][month]);
                return (
                  <div>
                    {'Month: '+month}

                    {tableOfContentsHandle()[year][0][month].reverse().map((title, titleIndex) => {
                      // console.log(title);
                      // console.log(tableOfContentsHandle()[year][0][month][0].Title);
                      return (
                        <div>
                          {title.Date + ' : ' + title.Title}

                          { }
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
      {/* <ReactMarkdown># Home *page*!</ReactMarkdown> */}
      {/* <ReactMarkdown children={readable.md} /> */}

      {/* <MdDisplay inputMdText={about} /> */}
      <ArticlePage article={about} />

    </div>
  )
}

export default HomePage