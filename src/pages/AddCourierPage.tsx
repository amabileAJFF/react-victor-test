import { Formik } from 'formik';
import * as Yup from 'yup';

import TablePackages from '../components/TablePackages';

import { ICourier } from '../models/CourierModel';
import { IPackages } from '../models/PackageModel';

const courierSchema = Yup.object().shape({
  weightRate: Yup.number().moreThan(0).label('Weight rate'),
  packages: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Description cannot be empty.'),
      length: Yup.number().moreThan(0).label('Length'),
      width: Yup.number().moreThan(0).label('Width'),
      weight: Yup.number().moreThan(0).label('Weight'),
      height: Yup.number().moreThan(0).label('Height')
    })
  )
});

const initialPackages: IPackages[] = [];

const initialValues: ICourier = {
  packages: initialPackages,
  weightRate: 0,
  total: 0,
  volumetricTotal: 0,
  weightTotal: 0
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
