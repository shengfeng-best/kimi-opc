import { View, Text, Input, Button, Textarea, Image, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { showToast, navigateBack } from '@tarojs/taro';
import './publish.css';

const STEPS = ['基本信息', '服务详情', '定价', '交付说明', '确认预览'];

const CATEGORIES = [
  '设计', '开发', '写作', '翻译', '营销',
  '数据', '音视频', '咨询', '其他',
];

export default function SkillPublishPage() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [process, setProcess] = useState('');
  const [priceType, setPriceType] = useState<'fixed' | 'range' | 'negotiable'>('fixed');
  const [price, setPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [additionalServices, setAdditionalServices] = useState<Array<{ name: string; price: string }>>([]);
  const [deliverable, setDeliverable] = useState('');
  const [cover, setCover] = useState('');
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) {
      showToast({ title: '标签已存在', icon: 'none' });
      return;
    }
    if (tags.length >= 5) {
      showToast({ title: '最多5个标签', icon: 'none' });
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addService = () => {
    setAdditionalServices([...additionalServices, { name: '', price: '' }]);
  };

  const removeService = (idx: number) => {
    setAdditionalServices(additionalServices.filter((_, i) => i !== idx));
  };

  const updateService = (idx: number, field: 'name' | 'price', value: string) => {
    const updated = [...additionalServices];
    updated[idx][field] = value;
    setAdditionalServices(updated);
  };

  const handleNext = () => {
    if (step === 0) {
      if (!title.trim() || !category) {
        showToast({ title: '请填写完整基本信息', icon: 'none' });
        return;
      }
    }
    if (step === 1) {
      if (!description.trim()) {
        showToast({ title: '请填写服务描述', icon: 'none' });
        return;
      }
    }
    if (step === 2) {
      if (priceType === 'fixed' && !price) {
        showToast({ title: '请填写价格', icon: 'none' });
        return;
      }
      if (priceType === 'range' && (!minPrice || !maxPrice)) {
        showToast({ title: '请填写价格区间', icon: 'none' });
        return;
      }
    }
    if (step === 3) {
      if (!deliverable.trim()) {
        showToast({ title: '请填写交付说明', icon: 'none' });
        return;
      }
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: call API
    setTimeout(() => {
      setLoading(false);
      showToast({ title: '发布成功', icon: 'success' });
      setTimeout(() => navigateBack(), 800);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <View className="publish-form">
            <View className="publish-field">
              <Text className="publish-label">服务标题</Text>
              <Input
                className="publish-input"
                placeholder="例如：Logo设计、小程序开发..."
                value={title}
                onInput={(e) => setTitle(e.detail.value)}
              />
            </View>

            <View className="publish-field">
              <Text className="publish-label">服务分类</Text>
              <View className="publish-categories">
                {CATEGORIES.map((cat) => (
                  <View
                    key={cat}
                    className={`publish-category ${category === cat ? 'publish-category--active' : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    <Text>{cat}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="publish-field">
              <Text className="publish-label">标签</Text>
              <View className="publish-tags">
                {tags.map((tag) => (
                  <View key={tag} className="publish-tag">
                    <Text>{tag}</Text>
                    <Text className="publish-tag-remove" onClick={() => removeTag(tag)}>×</Text>
                  </View>
                ))}
                <View className="publish-tag-input-wrap">
                  <Input
                    className="publish-tag-input"
                    placeholder="添加标签"
                    value={tagInput}
                    onInput={(e) => setTagInput(e.detail.value)}
                    onConfirm={addTag}
                  />
                  <Text className="publish-tag-add" onClick={addTag}>+</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View className="publish-form">
            <View className="publish-field">
              <Text className="publish-label">服务描述</Text>
              <Textarea
                className="publish-textarea"
                placeholder="详细描述您提供的服务内容..."
                value={description}
                onInput={(e) => setDescription(e.detail.value)}
              />
            </View>
            <View className="publish-field">
              <Text className="publish-label">服务流程</Text>
              <Textarea
                className="publish-textarea"
                placeholder="描述服务的工作流程..."
                value={process}
                onInput={(e) => setProcess(e.detail.value)}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View className="publish-form">
            <View className="publish-field">
              <Text className="publish-label">定价方式</Text>
              <View className="publish-price-types">
                {[
                  { key: 'fixed', label: '固定价格' },
                  { key: 'range', label: '价格区间' },
                  { key: 'negotiable', label: '面议' },
                ].map((pt) => (
                  <View
                    key={pt.key}
                    className={`publish-price-type ${priceType === pt.key ? 'publish-price-type--active' : ''}`}
                    onClick={() => setPriceType(pt.key as any)}
                  >
                    <Text>{pt.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {priceType === 'fixed' && (
              <View className="publish-field">
                <Text className="publish-label">价格（元）</Text>
                <Input
                  className="publish-input"
                  type="number"
                  placeholder="请输入价格"
                  value={price}
                  onInput={(e) => setPrice(e.detail.value)}
                />
              </View>
            )}

            {priceType === 'range' && (
              <View className="publish-field">
                <Text className="publish-label">价格区间（元）</Text>
                <View className="publish-range">
                  <Input
                    className="publish-input publish-range-input"
                    type="number"
                    placeholder="最低价"
                    value={minPrice}
                    onInput={(e) => setMinPrice(e.detail.value)}
                  />
                  <Text className="publish-range-sep">-</Text>
                  <Input
                    className="publish-input publish-range-input"
                    type="number"
                    placeholder="最高价"
                    value={maxPrice}
                    onInput={(e) => setMaxPrice(e.detail.value)}
                  />
                </View>
              </View>
            )}

            <View className="publish-field">
              <Text className="publish-label">增值服务</Text>
              {additionalServices.map((svc, i) => (
                <View key={i} className="publish-service">
                  <Input
                    className="publish-service-name"
                    placeholder="服务名称"
                    value={svc.name}
                    onInput={(e) => updateService(i, 'name', e.detail.value)}
                  />
                  <Input
                    className="publish-service-price"
                    type="number"
                    placeholder="价格"
                    value={svc.price}
                    onInput={(e) => updateService(i, 'price', e.detail.value)}
                  />
                  <Text className="publish-service-remove" onClick={() => removeService(i)}>×</Text>
                </View>
              ))}
              <Text className="publish-add-service" onClick={addService}>+ 添加增值服务</Text>
            </View>
          </View>
        );

      case 3:
        return (
          <View className="publish-form">
            <View className="publish-field">
              <Text className="publish-label">交付说明</Text>
              <Textarea
                className="publish-textarea"
                placeholder="描述交付物的形式、内容..."
                value={deliverable}
                onInput={(e) => setDeliverable(e.detail.value)}
              />
            </View>
            <View className="publish-field">
              <Text className="publish-label">封面图</Text>
              <View className="publish-cover">
                {cover ? (
                  <Image className="publish-cover-img" src={cover} />
                ) : (
                  <View className="publish-cover-placeholder" onClick={() => showToast({ title: '请选择图片', icon: 'none' })}>
                    <Text className="publish-cover-icon">+</Text>
                    <Text className="publish-cover-text">上传封面</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View className="publish-preview">
            <View className="preview-card">
              <Text className="preview-title">{title || '未填写标题'}</Text>
              <Text className="preview-category">{category || '未选择分类'}</Text>
              <View className="preview-tags">
                {tags.map((tag) => (
                  <Text key={tag} className="preview-tag">{tag}</Text>
                ))}
              </View>
              <Text className="preview-price">
                {priceType === 'fixed'
                  ? `¥${price}`
                  : priceType === 'range'
                  ? `¥${minPrice} - ¥${maxPrice}`
                  : '价格面议'}
              </Text>
              <Text className="preview-desc">{description || '未填写描述'}</Text>
              <Text className="preview-deliverable">交付: {deliverable || '未填写'}</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="skill-publish">
      <View className="publish-header">
        <Text className="publish-header-title">发布技能</Text>
      </View>

      <View className="publish-steps">
        {STEPS.map((s, i) => (
          <View key={s} className="publish-step">
            <View className={`publish-step-num ${i <= step ? 'publish-step-num--active' : ''}`}>
              <Text>{i + 1}</Text>
            </View>
            <Text className={`publish-step-label ${i <= step ? 'publish-step-label--active' : ''}`}>{s}</Text>
            {i < STEPS.length - 1 && <View className="publish-step-line" />}
          </View>
        ))}
      </View>

      <ScrollView scrollY className="publish-content">
        {renderStepContent()}
      </ScrollView>

      <View className="publish-footer">
        {step > 0 && (
          <Button className="publish-btn publish-btn--secondary" onClick={handlePrev}>
            上一步
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button className="publish-btn publish-btn--primary" onClick={handleNext}>
            下一步
          </Button>
        ) : (
          <Button className="publish-btn publish-btn--primary" loading={loading} onClick={handleSubmit}>
            确认发布
          </Button>
        )}
      </View>
    </View>
  );
}
