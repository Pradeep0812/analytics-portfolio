import type { Metadata } from 'next';
import { getSkillsSettings } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Skills | Capability Framework',
    description: 'Enterprise analytics capability framework documenting primary competencies, supporting skills, and technical proficiencies.',
};

export default function SkillsPage() {
    const skills = getSkillsSettings();

    return (
        <div className="section">
            <div className="container-wide">
                {/* Header */}
                <div className="section-header max-w-3xl">
                    <h6 className="section-title">Capability Framework</h6>
                    <h1>Skills & Competencies</h1>
                    <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">
                        Technical and analytical capabilities with business context and problem-solving applications.
                    </p>
                </div>

                {/* Primary Skills */}
                {skills.primary && skills.primary.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-6 pb-2 border-b border-surface-200 dark:border-surface-700">
                            Primary Competencies
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {skills.primary.map((skill, index) => (
                                <div key={index} className="panel p-6">
                                    <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-3">
                                        {skill.name}
                                    </h3>
                                    <dl className="space-y-3 text-sm">
                                        <div>
                                            <dt className="text-surface-500 dark:text-surface-400 uppercase tracking-wide text-xs mb-1">
                                                Business Context
                                            </dt>
                                            <dd className="text-surface-700 dark:text-surface-300">
                                                {skill.context}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-surface-500 dark:text-surface-400 uppercase tracking-wide text-xs mb-1">
                                                Problems Addressed
                                            </dt>
                                            <dd className="text-surface-700 dark:text-surface-300">
                                                {skill.problems}
                                            </dd>
                                        </div>
                                        {skill.tools && (
                                            <div>
                                                <dt className="text-surface-500 dark:text-surface-400 uppercase tracking-wide text-xs mb-1">
                                                    Tools & Technologies
                                                </dt>
                                                <dd className="text-surface-700 dark:text-surface-300">
                                                    {skill.tools}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Supporting Skills */}
                {skills.supporting && skills.supporting.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-6 pb-2 border-b border-surface-200 dark:border-surface-700">
                            Supporting Competencies
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {skills.supporting.map((skill, index) => (
                                <div key={index} className="panel p-5">
                                    <h3 className="font-medium text-surface-900 dark:text-surface-50 mb-2">
                                        {skill.name}
                                    </h3>
                                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                                        {skill.context}
                                    </p>
                                    {skill.problems && (
                                        <p className="text-xs text-surface-500 dark:text-surface-400">
                                            {skill.problems}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Familiar Skills */}
                {skills.familiar && skills.familiar.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-6 pb-2 border-b border-surface-200 dark:border-surface-700">
                            Working Knowledge
                        </h2>
                        <div className="panel">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-surface-200 dark:border-surface-700">
                                        <th className="text-left font-medium text-surface-900 dark:text-surface-50 p-4">
                                            Skill
                                        </th>
                                        <th className="text-left font-medium text-surface-900 dark:text-surface-50 p-4">
                                            Context
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                                    {skills.familiar.map((skill, index) => (
                                        <tr key={index}>
                                            <td className="p-4 text-surface-900 dark:text-surface-50 font-medium">
                                                {skill.name}
                                            </td>
                                            <td className="p-4 text-surface-600 dark:text-surface-400">
                                                {skill.context}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Empty state */}
                {(!skills.primary || skills.primary.length === 0) &&
                    (!skills.supporting || skills.supporting.length === 0) &&
                    (!skills.familiar || skills.familiar.length === 0) && (
                        <div className="panel p-12 text-center">
                            <p className="text-surface-500 dark:text-surface-400">
                                Skills framework not yet configured. Add skills via the CMS.
                            </p>
                        </div>
                    )}
            </div>
        </div>
    );
}
