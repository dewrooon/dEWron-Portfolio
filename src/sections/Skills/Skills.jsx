import './Skills.css'
﻿import { SiJavascript, SiReact, SiHtml5, SiCss, SiGit, SiGithub, SiVite, SiNodedotjs, SiFigma, SiVercel, SiSupabase } from 'react-icons/si'
import { FiCode } from 'react-icons/fi'
import SectionHeading from '../../components/SectionHeading'

const skillGroups = [
  { title: 'Основные технологии', label: 'Использую в большинстве проектов', items: [
    { name: 'JavaScript', icon: SiJavascript }, { name: 'React', icon: SiReact }, { name: 'HTML5', icon: SiHtml5 }, { name: 'CSS3', icon: SiCss }, { name: 'Git', icon: SiGit }, { name: 'GitHub', icon: SiGithub },
  ] },
  { title: 'Инструменты', label: 'Помогают создавать и запускать проекты', items: [
    { name: 'Vite', icon: SiVite }, { name: 'Node.js', icon: SiNodedotjs }, { name: 'VS Code', icon: FiCode }, { name: 'Figma', icon: SiFigma }, { name: 'Vercel', icon: SiVercel }, { name: 'Supabase', icon: SiSupabase, learning: true },
  ] },
]

function SkillItem({ name, icon: Icon, learning }) {
  return <li className="skill-item"><Icon className="skill-item__icon" aria-hidden="true" /><span>{name}</span>{learning && <span className="skill-item__note">Изучаю и использую</span>}</li>
}

export default function Skills() {
  return (
    <section className="skills section container" id="skills">
      <SectionHeading number="04" label="ТЕХНОЛОГИИ" title="Инструменты, с которыми работаю." />
      <div className="skills__groups">{skillGroups.map((group) => <div className="skills__group" key={group.title}><div className="skills__group-heading"><h3>{group.title}</h3><p>{group.label}</p></div><ul className="skills__list">{group.items.map((skill) => <SkillItem key={skill.name} {...skill} />)}</ul></div>)}</div>
    </section>
  )
}
