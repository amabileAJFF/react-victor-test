import { useEffect } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik'
import TablePackages from '../components/TablePackages';
import { ICourier } from '../models/CourierModel';



const courierSchema = Yup.object().shape({
    price_weight: Yup.number()
        .required('price weight is required'),

    packages: Yup.array().of(
        Yup.object().shape({
            description: Yup.string()
                .required('description is required'),

            length: Yup.number()
                .required('length is required'),
            width: Yup.number()
                .required('width is required'),
            height: Yup.number()
                .required('height is required'),

        })
    ),


})



const initialValues: ICourier = {

    packages: [
        {
            description: 'default desc',
            length: 0,
            width: 0,
            height: 0,
            volumenWeight: 0,
            weight: 0,
        },
    ],

    total: 0,
    total_volumetric: 0,
    total_weight: 0,
    price_weight: 0,

};


const AddCourierPage = () => {


    useEffect(() => {
        console.log('render main')
    }, [])


    return (

        <div className="container">

            <Formik
                initialValues={initialValues}
                validationSchema={courierSchema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values)
                    }, 1000)
                }}>

                {({ isSubmitting, handleSubmit }) => (
                    <form action="" id="kt_invoice_form" onSubmit={handleSubmit}>

                        <div className="mt-5 d-flex flex-column flex-lg-row">
                            <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-xl-10">
                                <div className="card">
                                    <div className="card-body p-12">
                                        <TablePackages />

                                        <div className="col-md-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100"
                                            >
                                                <span className='indicator-label'>Continue</span>
                                            </button>

                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>

                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AddCourierPage;

