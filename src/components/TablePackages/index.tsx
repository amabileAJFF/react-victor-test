import { FC } from 'react';

import { FormikErrors, FormikProps, FormikTouched } from 'formik';

import { ICourier } from '../../models/CourierModel';

import TableItemComponent from '../TableItem';
import { IPackages } from '../../models/PackageModel';

interface Props extends FormikProps<ICourier> {}

const TablePackages: FC<Props> = ({
  values,
  errors,
  touched,
  handleSubmit,
  setValues
}) => {
  const addEmptyPackage = () => {
    const newPackage = {
      description: '',
      height: 0,
      width: 0,
      length: 0,
      weight: 0,
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
            type="button"
            className="btn btn-outline-secondary btn-sm mx-5"
            onClick={addEmptyPackage}>
            Add empty package
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
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
                    // const listError =
                    //   (errors.packages?.length &&
                    //     (errors.packages[index] as FormikErrors<IPackages>)) ||
                    //   {};

                    let descriptionError = false;
                    let descriptionTouched = false;
                    let heightError = false;
                    let heightTouched = false;
                    let lengthError = false;
                    let lengthTouched = false;
                    let weightError = false;
                    let weightTouched = false;
                    let widthError = false;
                    let widthTouched = false;

                    const itemTouched: FormikTouched<IPackages>[] | undefined =
                      touched.packages;

                    const itemErrors: FormikErrors<IPackages>[] | undefined =
                      errors.packages as FormikErrors<IPackages>[];

                    if (
                      itemTouched === undefined ||
                      itemTouched[i] === undefined
                    ) {
                      descriptionTouched = false;
                      heightTouched = false;
                      weightTouched = false;
                      widthTouched = false;
                      lengthTouched = false;
                    } else {
                      descriptionTouched = itemTouched[i].description
                        ? true
                        : false;
                      heightTouched = itemTouched[i].height ? true : false;
                      weightTouched = itemTouched[i].weight ? true : false;
                      widthTouched = itemTouched[i].width ? true : false;
                      lengthTouched = itemTouched[i].length ? true : false;
                    }

                    if (
                      itemErrors === undefined ||
                      itemErrors[i] === undefined
                    ) {
                      descriptionError = false;
                      heightError = false;
                      weightError = false;
                      widthError = false;
                      lengthError = false;
                    } else {
                      descriptionError = itemErrors[i].description
                        ? true
                        : false;
                      heightError = itemErrors[i].height ? true : false;
                      weightError = itemErrors[i].weight ? true : false;
                      widthError = itemErrors[i].width ? true : false;
                      lengthError = itemErrors[i].length ? true : false;
                    }

                    return (
                      <TableItemComponent
                        key={`package#${i}`}
                        description={{
                          value: pkg.description,
                          fieldName: `packages.${i}.description`,
                          hasError: descriptionError,
                          isTouched: descriptionTouched
                        }}
                        onDescriptionChange={(description) =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              { ...values.packages[i], description },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                        height={{
                          value: String(pkg.height),
                          fieldName: `packages.${i}.height`,
                          hasError: heightError,
                          isTouched: heightTouched
                        }}
                        onHeightChange={(height) =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                height: Number(height),
                                volumetricWeight:
                                  (Number(height) *
                                    values.packages[i].width *
                                    values.packages[i].length) /
                                  5000
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                        width={{
                          value: String(pkg.width),
                          fieldName: `packages.${i}.width`,
                          hasError: widthError,
                          isTouched: widthTouched
                        }}
                        onWidthChange={(width) =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                width: Number(width),
                                volumetricWeight:
                                  (Number(width) *
                                    values.packages[i].height *
                                    values.packages[i].length) /
                                  5000
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                        length={{
                          value: String(pkg.length),
                          fieldName: `packages.${i}.length`,
                          hasError: lengthError,
                          isTouched: lengthTouched
                        }}
                        onLengthChange={(length) =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                length: Number(length),
                                volumetricWeight:
                                  (Number(length) *
                                    values.packages[i].width *
                                    values.packages[i].height) /
                                  5000
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                        weight={{
                          value: String(pkg.weight),
                          fieldName: `packages.${i}.weight`,
                          hasError: weightError,
                          isTouched: weightTouched
                        }}
                        onWeightChange={(weight) =>
                          setValues({
                            ...values,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                weight: Number(weight)
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          })
                        }
                        volumetricWeight={{
                          value: String(pkg.volumetricWeight),
                          fieldName: `packages.${i}.volumetricWeight`,
                          hasError: false,
                          isTouched: (touched as Record<string, boolean>)[
                            `volumetricWeight#item-${i}`
                          ]
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
