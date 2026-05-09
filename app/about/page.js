import Layout from '../../components/Layout'

export default function About() {
  return (
    <Layout navbarType="about">
      <section className="about-hero">
        <h1>أهلاً بك في Pathify</h1>
        <p>
          منصة متخصصة تساعدك في اكتشاف مسارك المهني في عالم التقنية 
          من خلال اختبارات شخصية وأدوات متقدمة. الفكرة نبعت من تجربة 
          حقيقية لطلاب كانوا محتارين ولا يعرفون أي مجال يناسبهم،
          لذلك صممنا هذه المنصة لتسهل عليك اكتشاف قدراتك واختيار 
          المجال المناسب بكل وضوح وثقة.
        </p>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="mission-section">
            <h2>مهمتنا 💡</h2>
            <p>
              نهدف إلى مساعدتك في اكتشاف ذاتك والتعرف على المجال الذي 
              يناسبك حقاً في عالم التقنية، بطريقة سهلة وواضحة، 
              دون الحاجة إلى بذل جهد كبير في البحث أو إضاعة الوقت 
              بين الخيارات المتعددة.
            </p>
          </div>

          <div className="tools-section">
            <h2>أدواتنا ⚙️</h2>
            <div className="tools-grid">
              <div className="tool-item">
                <h3>اختبارات شخصية</h3>
                <p>اختبارات سريعة تحدد المسار المناسب لميولك وقدراتك</p>
              </div>
              <div className="tool-item">
                <h3>موارد تعليمية</h3>
                <p>مقالات ونصائح عملية لفهم مجالات التقنية المختلفة</p>
              </div>
              <div className="tool-item">
                <h3>تخطيط المسار</h3>
                <p>اقتراحات مخصصة للمسارات التعليمية والمهنية المناسبة لك</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}