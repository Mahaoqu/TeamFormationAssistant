import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Card, DatePicker, Form,
  Input, InputNumber, message, Radio, Space
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AddProjForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const postForm = () => {
    // console.log(form.getFieldsValue());
    axios.post('projects', form.getFieldsValue()).then(data => {
      history.push('/projects');
    });
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const requirementValiadtor = index => ({ getFieldValue }) => ({
    validator(rule, value) {
      const weights = ['skillWeight',
        'experienceWeight',
        'hoursWeight',
        'languageWeight',
        'budgetWeight']
      let total_weight = 0;
      for (const w of weights) {
        total_weight += getFieldValue(["requirements", index, w]);
      }
      console.log(total_weight);

      if (total_weight !== 100) {
        return Promise.reject(["Sum of weights should be 100"]);
      }
      return Promise.resolve();
    }
  });



  return (
    <Card>
      <b>Project Details</b>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your project name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Project End Date" name="endDate">
          <DatePicker disabledDate={day => day < moment().add(30, 'days')} />
        </Form.Item>

        <Form.Item label="Team Size" name="teamSize">
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Budget(in dollars)" name="budget">
          <InputNumber
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            min={0}
          />
        </Form.Item>

        <Form.Item label="Tools" name="tools">
          <Input />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Radio.Group>
            <Radio value={0}>Very High</Radio>
            <Radio value={1}>High</Radio>
            <Radio value={2}>Low</Radio>
            <Radio value={3}>Very Low</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.List
          name="requirements"
          rules={[
            {
              validator: async (_, req) => {
                if (!req || req.length < 2) {
                  return Promise.reject(new Error('At least 2 passengers'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (


                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Requirements' : ''}
                    required={false}
                    key={field.key}
                  >
                    <div>Requirements for Team Member {index + 1}</div>
                    <Form.Item {...field}
                      label="Skill Weight"
                      name={[field.name, 'skillWeight']}
                      fieldKey={[field.fieldKey, 'skillWeight']}
                      initialValue={20}
                      rules={[requirementValiadtor(index)]}
                    >
                      <InputNumber min={0} max={100} />
                    </Form.Item>
                    <Form.Item label="Experience Weight"
                      name={[field.name, 'experienceWeight']}
                      fieldKey={[field.fieldKey, 'experienceWeight']}
                      initialValue={20}
                      rules={[requirementValiadtor(index)]}>
                      <InputNumber min={0} max={100}/>
                    </Form.Item>
                    <Form.Item label="Hours Weight"
                      name={[field.name, 'hoursWeight']}
                      fieldKey={[field.fieldKey, 'hoursWeight']}
                      initialValue={20}
                      rules={[requirementValiadtor(index)]}>
                      <InputNumber min={0} max={100} />
                    </Form.Item>
                    <Form.Item label="Language Weight"
                      name={[field.name, 'languageWeight']}
                      fieldKey={[field.fieldKey, 'languageWeight']}
                      initialValue={20}
                      rules={[requirementValiadtor(index)]}>
                      <InputNumber min={0} max={100} />
                    </Form.Item>
                    <Form.Item label="Budget Weight"
                      name={[field.name, 'budgetWeight']}
                      fieldKey={[field.fieldKey, 'budgetWeight']}
                      initialValue={20}
                      rules={[requirementValiadtor(index)]}>
                      <InputNumber min={0} max={100} />
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>

                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add new requirement
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={postForm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProjForm;
