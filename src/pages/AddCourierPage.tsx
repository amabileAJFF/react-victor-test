import { Formik } from 'formik';
import * as Yup from 'yup';

import TablePackages from '../components/TablePackages';

import { ICourier } from '../models/CourierModel';
import { IPackages } from '../models/PackageModel';

const courierSchema = Yup.object().shape({
  priceWeight: Yup.number().required('price weight is required'),
  packages: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Description cannot be empty.'),
      length: Yup.number().integer().moreThan(0).label('Length'),
      width: Yup.number().integer().moreThan(0).label('Width'),
      weight: Yup.number().moreThan(0).label('Weight'),
      height: Yup.number().integer().moreThan(0).label('Height')
    })
  )
});

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
  return (
    <div className="container">
      <Formik
        component={(props) => <TablePackages {...props} />}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // This method is only run when the form is valid.
          // Call API method with the params of `values`.
          // Then ...
          // Other logic...
        }}
        validationSchema={courierSchema}
      />
    </div>
  );
};

export default AddCourierPage;
