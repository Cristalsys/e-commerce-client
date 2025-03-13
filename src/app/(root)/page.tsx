import { SectionIntersection } from '@/components/shared/section-intersection'

import {
	AboutSection,
	ContactSection,
	HomeSection,
	ProductsSection,
	QuestionSection,
	StepsSection
} from '@/components'

export default function Home() {
	return (
		<>
			<SectionIntersection sectionId='Home'>
				<HomeSection />
			</SectionIntersection>
			<SectionIntersection sectionId='About'>
				<AboutSection />
			</SectionIntersection>
			<StepsSection />
			<SectionIntersection sectionId='Products'>
				<ProductsSection />
			</SectionIntersection>
			<SectionIntersection sectionId='FAQs'>
				<QuestionSection />
			</SectionIntersection>
			<SectionIntersection sectionId='Contact Us'>
				<ContactSection />
			</SectionIntersection>
		</>
	)
}
