import { FC } from 'react';

import clsx from 'clsx';
import { ErrorMessage, Field } from 'formik';
import { TrashIcon } from '../../App.assets';

type TableItemField = {
  hasError: boolean;
  isTouched: boolean;
  fieldName: string;
  value: string;
};

interface Props {
  description: TableItemField;
  height: TableItemField;
  key?: string;
  length: TableItemField;
  onDeleteItem: () => void;
  volumetricWeight: TableItemField;
  weight: TableItemField;
  width: TableItemField;
}

const TableItemComponent: FC<Props> = ({
  description,
  height,
  length,
  onDeleteItem,
  volumetricWeight: volumenWeight,
  weight,
  width
}) => {
  return (
    <tr className="border-bottom border-bottom-dashed">
      <td className="pe-4">
        <Field
          type="text"
          className={clsx(
            'form-control',

            {
              'is-invalid': description.isTouched && description.hasError
            },
            {
              'is-valid': description.isTouched && !description.hasError
            }
          )}
          name={description.fieldName}
          value={description.value}
          placeholder="Description"
        />

        <ErrorMessage component="div" name={description.fieldName} />
      </td>

      <td className="pe-4">
        <Field
          type="number"
          className={clsx(
            'form-control',
            {
              'is-invalid': length.isTouched && length.hasError
            },
            {
              'is-valid': length.isTouched && !length.hasError
            }
          )}
          name={length.fieldName}
          value={length.value}
          placeholder="0.00"
        />

        <ErrorMessage component="div" name={length.fieldName} />
      </td>

      <td className="pe-4">
        <Field
          type="number"
          className={clsx(
            'form-control',
            {
              'is-invalid': width.isTouched && width.hasError
            },
            {
              'is-valid': width.isTouched && !width.hasError
            }
          )}
          name={width.fieldName}
          value={width.value}
          placeholder="0.00"
        />

        <ErrorMessage component="div" name={width.fieldName} />
      </td>

      <td className="pe-4">
        <Field
          type="number"
          className={clsx(
            'form-control',
            {
              'is-invalid': height.isTouched && height.hasError
            },
            {
              'is-valid': height.isTouched && !height.hasError
            }
          )}
          name={height.fieldName}
          value={height.value}
          placeholder="0.00"
        />

        <ErrorMessage component="div" name={height.fieldName} />
      </td>

      <td className="pe-4">
        <Field
          type="number"
          readOnly
          className={clsx(
            'form-control form-control-solid',
            {
              'is-invalid': volumenWeight.isTouched && volumenWeight.hasError
            },
            {
              'is-valid': volumenWeight.isTouched && !volumenWeight.hasError
            }
          )}
          value={volumenWeight.value}
          name={volumenWeight.fieldName}
          placeholder="0.00"
        />

        <ErrorMessage component="div" name={volumenWeight.fieldName} />
      </td>

      <td className="pe-4">
        <Field
          type="number"
          className={clsx(
            'form-control',
            {
              'is-invalid': weight.isTouched && weight.hasError
            },
            {
              'is-valid': weight.isTouched && !weight.hasError
            }
          )}
          name={weight.fieldName}
          value={weight.value}
          placeholder="0.00"
        />

        <ErrorMessage component="div" name={weight.fieldName} />
      </td>

      <td className=" text-end">
        <button
          type="button"
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onDeleteItem}>
          <img
            src={TrashIcon}
            alt="trash-icon"
            style={{ width: '25px', height: '25px' }}
          />
        </button>
      </td>
    </tr>
  );
};

export default TableItemComponent;
