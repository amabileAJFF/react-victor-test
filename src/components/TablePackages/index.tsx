import { ChangeEvent, FC } from 'react';

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikProps,
  FormikTouched
} from 'formik';

import { ICourier } from '../../models/CourierModel';

import TableItemComponent from '../TableItem';
import { IPackages } from '../../models/PackageModel';
import clsx from 'clsx';

interface Props extends FormikProps<ICourier> {}

const TablePackages: FC<Props> = ({
  values,
  errors,
  touched,
  handleSubmit,
  setValues
}) => {
  console.log(values);

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="card my-5 p-3">
        <div className="card-header">
          <span className="h4">Courier Summary</span>
        </div>

        <div className="card-body">
          <div className="row table-responsive">
            <table className="table table-hover fw-bolder">
              <thead>
                <tr className="border-bottom fw-bolder">
                  <th style={{ minWidth: '200px' }}>Description</th>
                  <th style={{ minWidth: '100px' }}>Length</th>
                  <th style={{ minWidth: '100px' }}>Width</th>
                  <th style={{ minWidth: '100px' }}>Height</th>
                  <th style={{ minWidth: '100px' }}>Volumetric weight</th>
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
                        onHeightChange={(height) => {
                          const newVolumetric =
                            (Number(height) *
                              values.packages[i].width *
                              values.packages[i].length) /
                            5000;

                          const newVolumetricTotal =
                            values.packages.reduce<number>(
                              (prev, curr, index) => {
                                if (i === index) return prev + newVolumetric;

                                return prev + curr.volumetricWeight;
                              },
                              0
                            );

                          const newWeightTotal =
                            values.weightRate *
                            (newVolumetricTotal +
                              values.packages.reduce<number>(
                                (prev, curr) => prev + curr.weight,
                                0
                              ));

                          const newTotal = newWeightTotal * 1.05;

                          setValues({
                            ...values,
                            volumetricTotal: newVolumetricTotal,
                            weightTotal: newWeightTotal,
                            total: newTotal,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                height: Number(height),
                                volumetricWeight: newVolumetric
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          });
                        }}
                        width={{
                          value: String(pkg.width),
                          fieldName: `packages.${i}.width`,
                          hasError: widthError,
                          isTouched: widthTouched
                        }}
                        onWidthChange={(width) => {
                          const newVolumetric =
                            (Number(width) *
                              values.packages[i].height *
                              values.packages[i].length) /
                            5000;

                          const newVolumetricTotal =
                            values.packages.reduce<number>(
                              (prev, curr, index) => {
                                if (i === index) return prev + newVolumetric;

                                return prev + curr.volumetricWeight;
                              },
                              0
                            );

                          const newWeightTotal =
                            values.weightRate *
                            (newVolumetricTotal +
                              values.packages.reduce<number>(
                                (prev, curr) => prev + curr.weight,
                                0
                              ));

                          const newTotal = newWeightTotal * 1.05;

                          setValues({
                            ...values,
                            volumetricTotal: newVolumetricTotal,
                            weightTotal: newWeightTotal,
                            total: newTotal,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                width: Number(width),
                                volumetricWeight: newVolumetric
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          });
                        }}
                        length={{
                          value: String(pkg.length),
                          fieldName: `packages.${i}.length`,
                          hasError: lengthError,
                          isTouched: lengthTouched
                        }}
                        onLengthChange={(length) => {
                          const newVolumetric =
                            (Number(length) *
                              values.packages[i].height *
                              values.packages[i].width) /
                            5000;

                          const newVolumetricTotal =
                            values.packages.reduce<number>(
                              (prev, curr, index) => {
                                if (i === index) return prev + newVolumetric;

                                return prev + curr.volumetricWeight;
                              },
                              0
                            );

                          const newWeightTotal =
                            values.weightRate *
                            (newVolumetricTotal +
                              values.packages.reduce<number>(
                                (prev, curr) => prev + curr.weight,
                                0
                              ));

                          const newTotal = newWeightTotal * 1.05;

                          setValues({
                            ...values,
                            volumetricTotal: newVolumetricTotal,
                            weightTotal: newWeightTotal,
                            total: newTotal,
                            packages: [
                              ...values.packages.slice(0, i),
                              {
                                ...values.packages[i],
                                length: Number(length),
                                volumetricWeight: newVolumetric
                              },
                              ...values.packages.slice(
                                i + 1,
                                values.packages.length
                              )
                            ]
                          });
                        }}
                        weight={{
                          value: String(pkg.weight),
                          fieldName: `packages.${i}.weight`,
                          hasError: weightError,
                          isTouched: weightTouched
                        }}
                        onWeightChange={(weight) => {
                          const newWeightTotal =
                            values.weightRate *
                            (values.volumetricTotal +
                              values.packages.reduce<number>(
                                (prev, curr, index) => {
                                  if (index === i) return prev + Number(weight);

                                  return prev + curr.weight;
                                },
                                0
                              ));

                          const newTotal = newWeightTotal * 1.05;

                          setValues({
                            ...values,
                            weightTotal: newWeightTotal,
                            total: newTotal,
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
                          });
                        }}
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

              <tfoot>
                <tr className="borderless">
                  <th colSpan={7}>
                    <div className="d-flex flex-row justify-content-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => addEmptyPackage()}>
                        Add item
                      </button>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="row justify-content-end">
            <div className="col col-6 table-responsive">
              <table className="table table-light">
                <tbody>
                  <tr>
                    <td>Weight total</td>
                    <td>
                      {values.packages.reduce<number>(
                        (prev, curr) => prev + curr.weight,
                        0
                      )}
                    </td>
                    <td>Kg</td>
                  </tr>
                  <tr>
                    <td>Volumetric weight total</td>
                    <td>{values.volumetricTotal}</td>
                    <td>Kg</td>
                  </tr>
                  <tr>
                    <td>Weight rate</td>
                    <td>
                      <Field
                        as="input"
                        type="number"
                        step="0.01"
                        className={clsx(
                          'form-control',

                          {
                            'is-invalid':
                              touched.weightRate && errors.weightRate
                          },
                          {
                            'is-valid': touched.weightRate && !errors.weightRate
                          }
                        )}
                        name={`weightRate`}
                        onChange={({
                          target: { value }
                        }: ChangeEvent<HTMLInputElement>) => {
                          const newWeightTotal =
                            (values.packages.reduce<number>(
                              (prev, curr) => prev + curr.weight,
                              0
                            ) +
                              values.volumetricTotal) *
                            Number(value);

                          const newTotal = newWeightTotal * 1.05;

                          setValues({
                            ...values,
                            weightRate: Number(value),
                            weightTotal: newWeightTotal,
                            total: newTotal
                          });
                        }}
                        value={String(values.weightRate)}
                        placeholder="0.00"
                      />

                      <ErrorMessage name="weightRate" />
                    </td>
                    <td>USD/Kg</td>
                  </tr>
                  <tr>
                    <td>Weight total</td>
                    <td>{values.weightTotal}</td>
                    <td>USD</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td colSpan={2}>5%</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td>{values.total}</td>
                    <td>USD</td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
