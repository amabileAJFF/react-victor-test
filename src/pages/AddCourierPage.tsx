import { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import TablePackages from '../components/TablePackages';
import { ICourier } from '../models/CourierModel';
import { IPackages } from '../models/PackageModel';

// const courierSchema = Yup.object().shape({
//   price_weight: Yup.number().required('price weight is required'),
//   packages: Yup.array().of(
//     Yup.object().shape({
//       description: Yup.string().required('description is required'),
//       length: Yup.number().required('length is required'),
//       width: Yup.number().required('width is required'),
//       height: Yup.number().required('height is required')
//     })
//   )
// });

const initialPackages: IPackages[] = [
  {
    description: 'Package 1',
    height: 5,
    width: 4,
    length: 3,
    weight: 1.75,
    volumetricWeight: 0.012
  },
  {
    description: 'Package 2',
    height: 6,
    width: 6,
    length: 9,
    weight: 2.87,
    volumetricWeight: 0.0648
  }
];

const initialValues: ICourier = {
  packages: initialPackages,
  priceWeight: 0,
  total: 0,
  totalVolumetric: 0,
  totalWeight: 0
};

const AddCourierPage = () => {
  // useEffect(() => {
  //     console.log('render main')
  // }, [])

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);

          console.log('Trying to submit...');
        }}
        component={(props) => <TablePackages {...props} />}
      />
    </div>
  );
};

export default AddCourierPage;
