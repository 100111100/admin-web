import SimpleMng from 'components/Rebue/SimpleMng';
import moment2 from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Table, DatePicker } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SysForm from './SysForm';
import styles from './SysMng.less';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
@connect(({ kdilogistic, loading }) => ({ kdilogistic, loading: loading.models.kdilogistic }))
@Form.create()
export default class KdiLogistic extends SimpleMng {
  constructor() {
    super();
    this.moduleCode = 'kdilogistic';
    this.state.options = {
      pageNum: 1,
      pageSize: 5,
    };
    this.state.ok = true;
    this.state.new = '';
    this.state.aa = false;
  }

  //初始化
  componentDidMount() {
    // let {user} =this.props
    // let orgId=user.currentUser.orgId
    //这里连调的时候先写死orgId来给下面需要的地方用
    this.state.payloads = {
      orgId: 253274870,
      pageNum: this.state.options.pageNum,
      pageSize: this.state.options.pageSize,
    };
    this.props.dispatch({
      type: `${this.moduleCode}/list`,
      payload: this.state.payloads,
    });
  }
  // 刷新
  handleReload() {
    this.props.dispatch({
      type: `${this.moduleCode}/list`,
      payload: this.state.payloads,
    });
  }

  handleFormReset = () => {
    // const { form } = this.props;
    // form.resetFields();
    // this.props.dispatch({
    //   type: `${this.moduleCode}/list`,
    //   payload: this.state.payloads,
    // });
    console.log(this.state.new);
    console.log(moment2('1995-12-25 12:02:03'));
  };

  //点击submit查询
  list = () => {
    // let {user} =this.props
    // let orgId=user.currentUser.orgId
    //这里连调的时候先写死orgId
    let orgId = 253274870;
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      //使用正则来判断用户输入的是什么筛选条件,默认为名字，一旦是其他的就将名字设置为undefined
      let info = fieldsValue.receiverName;
      if (info !== undefined) {
        let reg = /[0-9]{13,30}/g;
        let reg2 = /[0-9]{5,11}/g;
        if (info.match(reg) !== null) {
          fieldsValue.logisticCode = info;
          fieldsValue.receiverName = undefined;
        } else if (info.match(reg2) !== null) {
          fieldsValue.receiverMobile = info;
          fieldsValue.receiverName = undefined;
        }
      }
      fieldsValue.pageNum = this.state.options.pageNum;
      fieldsValue.pageSize = this.state.options.pageSize;
      fieldsValue.orgId = orgId;
      //上传上来的时间是一个数组，需要格式化
      if (fieldsValue.orderTime !== undefined && fieldsValue.orderTime !== '' && fieldsValue.orderTime.length >= 1) {
        fieldsValue.orderTimeEnd = fieldsValue.orderTime[1].format('YYYY-MM-DD HH:mm:ss');
        fieldsValue.orderTimeStart = fieldsValue.orderTime[0].format('YYYY-MM-DD HH:mm:ss');
        fieldsValue.orderTime = undefined;
      }
      // console.log(fieldsValue);
      this.props.dispatch({
        type: `${this.moduleCode}/list`,
        payload: fieldsValue,
      });
    });
  };

  //改变页数查询
  handleTableChange = pagination => {
    // let {user} =this.props
    // let orgId=user.currentUser.orgId
    //这里连调的时候先写死orgId
    let orgId = 253274870;
    const pager = { ...this.state.pagination };
    const { form } = this.props;
    pager.current = pagination.current;
    this.setState({
      options: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      //使用正则来判断用户输入的是什么筛选条件,默认为名字，一旦是其他的就将名字设置为undefined
      let info = fieldsValue.receiverName;
      if (info !== undefined) {
        let reg = /[0-9]{13,30}/g;
        let reg2 = /[0-9]{5,11}/g;
        if (info.match(reg) !== null) {
          fieldsValue.logisticCode = info;
          fieldsValue.receiverName = undefined;
        } else if (info.match(reg2) !== null) {
          fieldsValue.receiverMobile = info;
          fieldsValue.receiverName = undefined;
        }
      }
      fieldsValue.pageNum = pagination.current;
      fieldsValue.pageSize = pagination.pageSize;
      fieldsValue.orgId = orgId;
      //上传上来的时间是一个数组，需要格式化
      if (fieldsValue.orderTime !== undefined && fieldsValue.orderTime !== '' && fieldsValue.orderTime.length >= 1) {
        fieldsValue.orderTimeEnd = fieldsValue.orderTime[1].format('YYYY-MM-DD HH:mm:ss');
        fieldsValue.orderTimeStart = fieldsValue.orderTime[0].format('YYYY-MM-DD HH:mm:ss');
        fieldsValue.orderTime = undefined;
      }
      this.props.dispatch({
        type: `${this.moduleCode}/list`,
        payload: fieldsValue,
      });
    });
  };

  disabledDate = current => {
    if (this.state.aa === false) {
      return current > moment2();
    } else {
      return current > moment2(this.state.new).add(6, 'day') || current < moment2(this.state.new).add(-6, 'day');
    }
  };

  disabledDate1 = current => {};

  onCalendarChange = (moment1, oment, string) => {
    this.setState({
      aa: true,
    });
    this.setState({
      new: moment1[0].format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.list} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="">
              {getFieldDecorator('receiverName')(<Input placeholder="收件人姓名/手机/快递单号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="">
              {getFieldDecorator('logisticStatus')(
                <Select placeholder="状态" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="1">已揽收</Option>
                  <Option value="2">在途中</Option>
                  <Option value="3">已签收</Option>
                  <Option value="0">无轨迹</Option>
                  <Option value="-1">作废</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="">
              {getFieldDecorator('orderTime')(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={['开始日期', '结束日期']}
                  onCalendarChange={this.onCalendarChange}
                  disabledDate={this.disabledDate}
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span style={{ float: 'left', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" disabledDate={this.disabledDate} />
          </Col>
          <Col md={6} sm={24} style={{ background: 'red' }}>
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" disabledDate={this.disabledDate1} />
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { kdilogistic: { kdilogistic }, loading } = this.props;
    const { editForm, editFormType, editFormTitle, editFormRecord } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: kdilogistic.pageSize,
      total: Number(kdilogistic.total),
      pageSizeOptions: ['5', '10'],
    };
    const columns = [
      {
        title: '快递单号',
        dataIndex: 'logisticCode',
        key: 'logisticCode',
      },
      {
        title: '快递公司',
        dataIndex: 'shipperName',
        key: 'shipperName',
      },
      {
        title: '状态',
        dataIndex: 'logisticStatus',
        key: 'logisticStatus',
        render: (text, record) => {
          if (record.logisticStatus === '0') return '无轨迹';
          if (record.logisticStatus === '1') return '已揽收';
          if (record.logisticStatus === '2') return '在途中';
          if (record.logisticStatus === '3') return '已签收';
          if (record.logisticStatus === '4') return '问题件';
        },
      },
      {
        title: '收件人',
        dataIndex: 'receiverName',
        key: 'receiverName',
      },
      {
        title: '收件人手机',
        dataIndex: 'receiverMobile',
        key: 'receiverMobile',
      },
      {
        title: '商品内容',
        dataIndex: 'orderTitle',
        key: 'orderTitle',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
      },
    ];

    return (
      <PageHeaderLayout title="快递订单管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
          <div className={styles.tableList}>
            <Table
              rowKey="orderId"
              pagination={paginationProps}
              loading={loading}
              onChange={this.handleTableChange}
              dataSource={kdilogistic.list}
              expandedRowRender={record => (
                <p style={{ margin: 0 }}>
                  <span>{'寄件人:' + record.senderName}</span>
                  <span style={{ paddingLeft: '15px' }}>{'寄件人手机:' + record.senderMobile}</span>
                </p>
              )}
              columns={columns}
            />
          </div>
        </Card>
        {editForm === 'sysForm' && (
          <SysForm
            visible
            title={editFormTitle}
            editFormType={editFormType}
            record={editFormRecord}
            closeModal={() => this.setState({ editForm: undefined })}
            handleSave={fields => this.handleSave(fields)}
          />
        )}
      </PageHeaderLayout>
    );
  }
}
