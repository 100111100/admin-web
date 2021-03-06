import React, { Fragment, PureComponent } from 'react';
import { Form, Icon, Input, Select } from 'antd';
import { connect } from 'dva';
import EditForm from 'components/Rebue/EditForm';

const FormItem = Form.Item;
const { Option } = Select;

// 添加与编辑的表单
@connect(({ loading }) => ({
  submitting: loading.models.pfmsys,
}))
@EditForm
export default class CompanyForm extends PureComponent {
  state = {
    see: 'password',
  };

  show = () => {
    if (this.state.see === 'password') {
      this.setState({ see: 'text' });
    } else {
      this.setState({ see: 'password' });
    }
  };

  render() {
    const { form } = this.props;

    const types = {
      type: this.state.see,
    };

    return (
      <Fragment>
        {form.getFieldDecorator('id')(<Input type="hidden" />)}
        {form.getFieldDecorator('orgId')(<Input type="hidden" />)}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
          {form.getFieldDecorator('companyName', {
            rules: [{ required: true, message: '请输入快递公司名称' }],
          })(<Input placeholder="请输入快递公司的名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号">
          {form.getFieldDecorator('companyAccount', {
            rules: [{ required: true, message: '请输入快递公司帐号' }],
          })(<Input placeholder="请输入快递公司帐号" />)}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          style={{ marginLeft: 20, width: '76%' }}
          label="密码"
        >
          {form.getFieldDecorator('companyPwd', {
            rules: [{ required: true, message: '请输入快递公司密码' }],
          })(<Input style={{ width: '290px' }} placeholder="请输入快递公司密码" {...types} />)}
        </FormItem>
        <a onClick={() => this.show()} style={{ float: 'right', marginTop: -55, marginRight: 60 }}>
          <Icon type="eye" />
        </a>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编号">
          {form.getFieldDecorator('companyCode', {
            rules: [{ required: true, message: '请输入快递公司编号' }],
          })(<Input placeholder="请输入快递公司编号" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="支付方式">
          {form.getFieldDecorator('payType', {
            rules: [{ required: true, message: '请选择支付方式' }],
          })(
            <Select placeholder="请选择支付类型" style={{ width: '100%' }}>
              <Option value="1">现付</Option>
              <Option value="2">到付</Option>
              <Option value="3">月结</Option>
              <Option value="4">第三方付</Option>
            </Select>
          )}
        </FormItem>
      </Fragment>
    );
  }
}
