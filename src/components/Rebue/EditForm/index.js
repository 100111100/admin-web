import React, { PureComponent } from 'react';
import { Button, Form, Modal } from 'antd';

// 编辑表单
const EditForm = DivInfo => {
  return @Form.create({
    mapPropsToFields(props) {
      const { record } = props;
      const result = {};
      for (const key in record) {
        if ({}.hasOwnProperty.call(record, key)) {
          result[key] = Form.createFormField({
            value: record[key],
          });
        }
      }
      return result;
    },
  })
  class extends PureComponent {
    render() {
      const { title, visible, width = 520, handleSave, closeModal, submitting, form, ...restProps } = this.props;
      const handleOk = () => {
        form.validateFieldsAndScroll((err, fields) => {
          if (err) return;
          handleSave(fields);
        });
      };
      return (
        <Modal
          visible={visible}
          title={title}
          closable={false}
          bodyStyle={{ overflow: 'scroll' }}
          width={width}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={closeModal}>
              返 回
            </Button>,
            <Button key="submit" type="primary" size="large" loading={submitting} onClick={handleOk}>
              保 存
            </Button>,
          ]}
        >
          <DivInfo form={form} {...restProps} />
        </Modal>
      );
    }
  };
};

export default EditForm;
