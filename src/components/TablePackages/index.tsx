import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { ErrorMessage, Field, FormikErrors, FormikProps } from 'formik';

import { ICourier } from '../../models/CourierModel';
import { IPackages } from '../../models/PackageModel';

import { TrashIcon } from '../../App.assets';
import TableItemComponent from '../TableItem';

interface Props extends FormikProps<ICourier> {}

const TablePackages: FC<Props> = ({
  values,
  errors,
  touched,
  handleSubmit,
  setValues
}) => {
  // useEffect(() => {
  //     console.log('render table')

  //     const { total_volumetric, total_weight } = calculateTotal();

  //     formik.setValues({
  //         ...formik.values,
  //         total_volumetric: total_volumetric,
  //         total_weight: total_weight
  //     });

  // }, [formik.values.packages, formik.values.price_weight])

  const handleAddPackage = () => {
    // const packages = [...formik.values.packages];
    // packages.push({
    //   description: 'default desc',
    //   // scale: '',
    //   length: 0,
    //   width: 0,
    //   height: 0,
    //   volumenWeight: 0,
    //   weight: 0
    // });
    // formik.setValues({
    //   ...formik.values,
    //   packages
    // });
  };

  const handleRemovePackage = (index: number) => {
    // formik.setValues({
    //   ...formik.values,
    //   packages: formik.values.packages.filter((item, i) => index !== i)
    // });
  };

  const calculateTotal = () => {
    // var total_volumetric = 0;
    // var total_weight = 0;
    // formik.values.packages.map((item, index) => {
    //   const volumetric: number =
    //     (item.length * item.width * item.height) / 5000;
    //   const weight: number = item.weight * formik.values.price_weight;
    //   formik.values.packages[index].volumenWeight = volumetric;
    //   total_volumetric += volumetric;
    //   total_weight += weight;
    // });
    // return { total_volumetric, total_weight };
  };

  const addRandomPackage = () => {
    const newPackage = {
      description: `Package ${values.packages.length}`,
      height: Math.floor(Math.random() * 10 + 1),
      width: Math.floor(Math.random() * 10 + 1),
      length: Math.floor(Math.random() * 10 + 1),
      weight: Math.floor(Math.random() * 5 * 100) / 100 + 1,
      volumetricWeight: 0
    };

    setValues({
      ...values,
      packages: [
        ...values.packages,
        {
          ...newPackage,
          volumetricWeight:
            (newPackage.height * newPackage.width * newPackage.length) / 5000
        }
      ]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card my-5 p-3">
        <div className="card-header">
          <span className="h4">Courier Summary</span>

          <button
            className="btn btn-outline-secondary btn-sm mx-5"
            onClick={addRandomPackage}>
            Add random package
          </button>
        </div>
        <div className="card-body">
          <div className="row w-100">
            <table className="table fw-bolder">
              <thead>
                <tr className="border-bottom fw-bolder">
                  <th style={{ minWidth: '200px' }}>Description</th>
                  <th style={{ minWidth: '100px' }}>Length</th>
                  <th style={{ minWidth: '100px' }}>Width</th>
                  <th style={{ minWidth: '100px' }}>Height</th>
                  <th style={{ minWidth: '100px' }}>Volumen weight</th>
                  <th style={{ minWidth: '100px' }}>Weight</th>
                  <th style={{ minWidth: '50px' }}></th>
                </tr>
              </thead>

              <tbody>
                {values.packages &&
                  values.packages.map((pkg, i) => {
                    console.log('render item');

                    // const listError =
                    //   (errors.packages?.length &&
                    //     (errors.packages[index] as FormikErrors<IPackages>)) ||
                    //   {};

                    // const listTouched =
                    //   (touched.packages?.length && touched.packages[index]) ||
                    //   {};

                    // const volumetric: number =
                    //   (item.length * item.width * item.height) / 5000;

                    return (
                      <TableItemComponent
                        description={{
                          value: pkg.description,
                          fieldName: `description#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        height={{
                          value: String(pkg.height),
                          fieldName: `height#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        width={{
                          value: String(pkg.width),
                          fieldName: `width#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        length={{
                          value: String(pkg.length),
                          fieldName: `length#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        weight={{
                          value: String(pkg.weight),
                          fieldName: `weight#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        volumetricWeight={{
                          value: String(pkg.volumetricWeight),
                          fieldName: `volumetricWeight#item-${i}`,
                          hasError: false,
                          isTouched: false
                        }}
                        onDeleteItem={() =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="row w-100">
            {/* <tr className="text-gray-700">
            <th colSpan={4}>
              <button
                type="button"
                className="btn btn-sm btn-success py-1"
                onClick={() => handleAddPackage()}>
                Add item
              </button>
            </th>

            <th className="fs-5 ">Total volumetric</th>

            <th className=" fs-5 text-nowrap">
              $ <span>{values.total_volumetric}</span>
            </th>
          </tr>

          <tr className="text-gray-700">
            <th>Price weight :</th>

            <th colSpan={3}>
              <div className="col-md-3">
                <input
                  type="number"
                  {...formik.getFieldProps('price_weight')}
                  className={clsx(
                    'form-control',
                    {
                      'is-invalid':
                        formik.touched.price_weight &&
                        formik.errors.price_weight
                    },
                    {
                      'is-valid':
                        formik.touched.price_weight &&
                        !formik.errors.price_weight
                    }
                  )}
                  name={`price_weight`}
                  placeholder="0.00"
                />

                <ErrorMessage component="div" name={'price_weight'} />
              </div>
            </th>

            <th className="fs-5 ">Total weight</th>

            <th className=" fs-5 text-nowrap">
              $ <span>{formik.values.total_weight}</span>
            </th>
          </tr> */}
          </div>
        </div>

        <div className="card-footer d-flex flex-row justify-content-end">
          <button type="submit" className="btn btn-primary">
            <span className="indicator-label">Continue</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TablePackages;
