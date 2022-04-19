import { React, useContext, useEffect, useState } from 'react';
import ReportContext from '../../Context/Report/ReportContext';
import { Spinner } from '../Layout/Spinner';
import moment from 'moment'
import { GetReports, CreateReportsCollection } from '../../Context/Report/ReportActions';
import logo from '../../Images/dwtlogo.png'
import { Link } from 'react-router-dom';
import { ImageList } from '../../Context/db';
import ImageContext from '../../Context/Image/ImageContext';
import { db } from '../../Context/db';
import { useLiveQuery } from 'dexie-react-hooks';



export const AllReports = () => {

    const imagesFromDb = useLiveQuery(
        () => db.images.toArray()
    );


    const { reports, loading, reportDispatch } = useContext(ReportContext);
    const { images, imageDispatch } = useContext(ImageContext);




    useEffect(() => {

        imageDispatch({ type: 'GET_IMAGES', payload: imagesFromDb });

        const reports = GetReports();


        //if user has reports in local storage update component state.
        if (reports !== null && reports.length > 0) {


            reportDispatch({ type: 'SET_LOADING' });
            reportDispatch({ type: 'GET_REPORTS', payload: reports });



            // imageDispatch({ type: 'GET_IMAGES', payload: images });

        } else {
            //set empty array in local storage
            CreateReportsCollection();
        }

    }, [reportDispatch, imageDispatch, imagesFromDb]);



    if (!loading) {
        return (

            <div>



                {

                    reports.length > 0 ? reports.map((report) => (

                        <div class="card  bg-base-100 shadow-xl image-full mb-3">

                            <figure><img src={logo} alt="report" /></figure>

                            <div class="card-body">
                                <h2 class="card-title">{report.title}</h2>
                                <p>{moment(report.timestamp).format("llll")} </p>
                                <p className='font-bold underline'>Description</p>
                                <p>{report.description}</p>
                                <p>Category: {report.category}</p>

                                <div class="card-actions">

                                </div>

                                <div class="card-actions justify-end">
                                    <Link to='/userreport' className="btn btn-primary mr-3" state={{ from: report.id }}>
                                        View
                                    </Link>
                                    <div class="avatar">
                                        <div class="w-12 rounded-xl">
                                            {images !== undefined && images.length > 0 ? images.map((image) => (
                                                image.id === report.imageId ? <img src={image.image} alt={report}></img> : null
                                            )) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    ))
                        : <h1>No reports</h1>
                }




            </div>
        )

    }
    else {
        return <Spinner />
    }

}
