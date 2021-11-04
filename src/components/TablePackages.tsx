
import clsx from 'clsx';
import { ErrorMessage, Field, FormikErrors, useFormikContext } from 'formik'
import { useEffect } from 'react';
import { ICourier } from '../models/CourierModel';
import { IPackages } from '../models/PackageModel';



const TablePackages = (props: any) => {

    const formik = useFormikContext<ICourier>();

    useEffect(() => {
        console.log('render table')

        const { total_volumetric, total_weight } = calculateTotal();

        formik.setValues({
            ...formik.values,
            total_volumetric: total_volumetric,
            total_weight: total_weight
        });

    }, [formik.values.packages, formik.values.price_weight])

    const handleAddPackage = () => {

        const packages = [...formik.values.packages];

        packages.push({
            description: 'default desc',
            // scale: '',
            length: 0,
            width: 0,
            height: 0,
            volumenWeight: 0,
            weight: 0
        });

        formik.setValues({
            ...formik.values, packages
        });

    }


    const handleRemovePackage = (index: number) => {

        formik.setValues({
            ...formik.values,
            packages: formik.values.packages.filter(
                (item, i) => index !== i
            )
        });
    }


    const calculateTotal = () => {

        var total_volumetric = 0;
        var total_weight = 0;

        formik.values.packages.map((item, index) => {

            const volumetric: number = (item.length * item.width * item.height) / 5000;
            const weight: number = item.weight * formik.values.price_weight;

            formik.values.packages[index].volumenWeight = volumetric;

            total_volumetric += volumetric;

            total_weight += weight;


        })

        return { total_volumetric, total_weight }
    }

    return (


        <div className="table-responsive mb-10">
            {/* g-5 gs-0 class add table */}
            <table className="table table-hover mb-0 fw-bolder text-gray-700" >
                <thead>
                    <tr className="border-bottom fs-7 fw-bolder text-gray-700 ">
                        <th className="min-w-200px">Description</th>
                        <th className="min-w-100px">Length</th>
                        <th className="min-w-100px">Width</th>
                        <th className="min-w-100px">Height</th>
                        <th className="min-w-100px">Volumen weight</th>
                        <th className="min-w-100px">Weight</th>
                        <th className=""></th>

                    </tr>
                </thead>
                <tbody>

                    {
                        formik.values.packages &&
                        formik.values.packages.map((item, index) => {

                            console.log('render item')

                            const listError = formik.errors.packages?.length && formik.errors.packages[index] as FormikErrors<IPackages> || {};

                            const listTouched = formik.touched.packages?.length && formik.touched.packages[index] || {};

                            const volumetric: number = (item.length * item.width * item.height) / 5000;


                            return (
                                <tr className="border-bottom border-bottom-dashed" key={index} >

                                    <td className="pe-4">
                                        <Field
                                            type="text"
                                            className={clsx(
                                                'form-control',


                                                // { 'is-invalid': listTouched.description && formik.errors?.packages?.[index]?.description },

                                                { 'is-invalid': listTouched.description && listError.description },
                                                {
                                                    'is-valid': listTouched.description && !listError.description,
                                                }
                                            )}

                                            name={`packages.${index}.description`}
                                            placeholder="Description" />

                                        <ErrorMessage component="div" name={`packages.${index}.description`} />
                                    </td>






                                    <td className="pe-4">
                                        <Field
                                            type="number"

                                            className={clsx(
                                                'form-control',
                                                { 'is-invalid': listTouched.length && listError.length },
                                                {
                                                    'is-valid': listTouched.length && !listError.length,
                                                }
                                            )}

                                            name={`packages.${index}.length`}
                                            placeholder="0.00" />

                                        <ErrorMessage
                                            component="div"
                                            name={`packages.${index}.length`}
                                        />
                                    </td>



                                    <td className="pe-4">
                                        <Field
                                            type="number"
                                            className={clsx(
                                                'form-control',
                                                { 'is-invalid': listTouched.width && listError.width },
                                                {
                                                    'is-valid': listTouched.width && !listError.width,
                                                }
                                            )}

                                            name={`packages.${index}.width`}
                                            placeholder="0.00" />

                                        <ErrorMessage
                                            component="div"
                                            name={`packages.${index}.width`}
                                        />
                                    </td>


                                    <td className="pe-4">
                                        <Field
                                            type="number"
                                            className={clsx(
                                                'form-control',
                                                { 'is-invalid': listTouched.height && listError.height },
                                                {
                                                    'is-valid': listTouched.height && !listError.height,
                                                }
                                            )}

                                            name={`packages.${index}.height`}
                                            placeholder="0.00" />

                                        <ErrorMessage
                                            component="div"
                                            name={`packages.${index}.height`}
                                        />
                                    </td>


                                    <td className="pe-4">
                                        <Field
                                            type="number"
                                            readOnly
                                            className={clsx(
                                                'form-control form-control-solid',
                                                { 'is-invalid': listTouched.volumenWeight && listError.volumenWeight },
                                                {
                                                    'is-valid': listTouched.volumenWeight && !listError.volumenWeight,
                                                }
                                            )}
                                            value={volumetric}

                                            name={`packages.${index}.volumenWeight`}
                                            placeholder="0.00" />

                                        <ErrorMessage
                                            component="div"
                                            name={`packages.${index}.volumenWeight`}
                                        />
                                    </td>


                                    <td className="pe-4">
                                        <Field
                                            type="number"

                                            className={clsx(
                                                'form-control',
                                                { 'is-invalid': listTouched.weight && listError.weight },
                                                {
                                                    'is-valid': listTouched.weight && !listError.weight,
                                                }
                                            )}

                                            name={`packages.${index}.weight`}
                                            placeholder="0.00" />

                                        <ErrorMessage
                                            component="div"
                                            name={`packages.${index}.weight`}
                                        />
                                    </td>








                                    <td className=" text-end">
                                        {
                                            index ?
                                                <button type="button" className="btn btn-sm btn-icon btn-active-color-primary" onClick={() => handleRemovePackage(index)} >
                                                    <span className="svg-icon svg-icon-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                </button>
                                                : null
                                        }
                                    </td>

                                </tr>
                            )
                        })
                    }


                </tbody>
                <tfoot>
                    <tr className="text-gray-700">
                        <th colSpan={4}>
                            <button type="button" className="btn btn-sm btn-success py-1" onClick={() => handleAddPackage()}>Add item</button>
                        </th>


                        <th className="fs-5 ">Total volumetric</th>


                        <th className=" fs-5 text-nowrap">
                            $ <span>{formik.values.total_volumetric}</span>
                        </th>
                    </tr>

                    <tr className="text-gray-700">

                        <th >
                            Price weight :
                        </th>

                        <th colSpan={3} >
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    {...formik.getFieldProps('price_weight')}
                                    className={clsx(
                                        'form-control',
                                        { 'is-invalid': formik.touched.price_weight && formik.errors.price_weight },
                                        {
                                            'is-valid': formik.touched.price_weight && !formik.errors.price_weight,
                                        }
                                    )}

                                    name={`price_weight`}
                                    placeholder="0.00" />

                                <ErrorMessage component="div" name={'price_weight'} />

                            </div>
                        </th>


                        <th className="fs-5 ">Total weight</th>


                        <th className=" fs-5 text-nowrap">
                            $ <span>{formik.values.total_weight}</span>
                        </th>
                    </tr>


                </tfoot>
            </table>

        </div>
    );

}

export default TablePackages;