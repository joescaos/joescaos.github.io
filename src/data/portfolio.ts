import type { PortfolioData } from '../types/portfolio.types'

export function getPortfolioData(): PortfolioData {
  return {
    contact: {
      email: 'jxexcxo@gmail.com',
      location: 'Colombia',
      linkedinUrl: 'https://www.linkedin.com/in/johan-esteban-ca%C3%B1as-ossa-51ba87135',
      githubUsername: 'joescaos',
    },

    experiences: [
      {
        id: 'epam',
        company: 'EPAM Systems',
        roleKey: 'experience.epam.role',
        period: 'Feb 2025 – ' ,
        location: 'Remote, Colombia',
        bulletKeys: [
          'experience.epam.bullet_1',
          'experience.epam.bullet_2',
          'experience.epam.bullet_3',
          'experience.epam.bullet_4',
        ],
        technologies: ['Java', 'Spring Boot', 'Micronaut', 'gRPC', 'Kafka', 'AWS', 'OCI', 'Salesforce'],
        current: true,
      },
      {
        id: 'mercadolibre',
        company: 'Mercado Libre',
        roleKey: 'experience.mercadolibre.role',
        period: 'Jun 2021 – Feb 2025',
        location: 'Remote, Colombia',
        bulletKeys: [
          'experience.mercadolibre.bullet_1',
          'experience.mercadolibre.bullet_2',
          'experience.mercadolibre.bullet_3',
          'experience.mercadolibre.bullet_4',
          'experience.mercadolibre.bullet_5',
        ],
        technologies: ['Java', 'Spring Boot', 'Hibernate', 'REST', 'JIRA'],
      },
      {
        id: 'ejercito',
        company: 'Ejército de Colombia',
        roleKey: 'experience.ejercito.role',
        period: 'Mar 2013 – May 2021',
        location: 'Colombia',
        bulletKeys: [
          'experience.ejercito.bullet_1',
          'experience.ejercito.bullet_2',
          'experience.ejercito.bullet_3',
          'experience.ejercito.bullet_4',
        ],
        technologies: [],
      },
    ],

    education: [
      {
        id: 'masters',
        institution: 'Politécnico Grancolombiano',
        degreeKey: 'education.masters.degree',
        period: '2025 – ',
        location: 'Bogotá, Colombia',
        current: true,
      },
      {
        id: 'bachelors',
        institution: 'Politécnico Grancolombiano',
        degreeKey: 'education.bachelors.degree',
        period: '2017 – 2021',
        location: 'Bogotá, Colombia',
      },
    ],

    certifications: [
      { id: 'aws-ai', nameKey: 'certifications.aws_ai', issuer: 'Amazon Web Services', issuerCategory: 'aws' },
      { id: 'aws-dev', nameKey: 'certifications.aws_dev', issuer: 'Amazon Web Services', issuerCategory: 'aws' },
      { id: 'google-genai', nameKey: 'certifications.google_genai', issuer: 'Google', issuerCategory: 'google' },
      { id: 'oci-foundations', nameKey: 'certifications.oci_foundations', issuer: 'Oracle', issuerCategory: 'oracle' },
      { id: 'oci-data', nameKey: 'certifications.oci_data', issuer: 'Oracle', issuerCategory: 'oracle' },
      { id: 'oci-ai', nameKey: 'certifications.oci_ai', issuer: 'Oracle', issuerCategory: 'oracle' },
      { id: 'django', nameKey: 'certifications.django', issuer: 'University of Michigan', issuerCategory: 'university' },
      { id: 'java-android', nameKey: 'certifications.java_android', issuer: 'Vanderbilt University', issuerCategory: 'university' },
      { id: 'python', nameKey: 'certifications.python', issuer: 'University of Michigan', issuerCategory: 'university' },
      { id: 'ml', nameKey: 'certifications.ml', issuer: 'University of London', issuerCategory: 'university' },
    ],

    projects: [
      {
        id: 'cancerguard',
        nameKey: 'projects.cancerguard.name',
        descriptionKey: 'projects.cancerguard.description',
        technologies: ['Java', 'Spring Boot', 'Salesforce', 'gRPC', 'Kafka', 'AWS', 'DataDog', 'Confluent'],
      },
      {
        id: 'sellers-comm',
        nameKey: 'projects.sellers_comm.name',
        descriptionKey: 'projects.sellers_comm.description',
        technologies: ['Java', 'Spring Boot', 'REST', 'Kibana', 'Fury', 'BigQueue', 'BigQuery', 'New Relic'],
      },
      {
        id: 'gmv-api',
        nameKey: 'projects.gmv_api.name',
        descriptionKey: 'projects.gmv_api.description',
        technologies: ['Java', 'Spring Boot', 'REST', 'Fury', 'BigQueue', 'BigQuery', 'Kibana', 'New Relic'],
      },
      {
        id: 'schedule-events',
        nameKey: 'projects.schedule_events.name',
        descriptionKey: 'projects.schedule_events.description',
        technologies: ['Java', 'Spring Boot', 'REST', 'Kibana', 'Fury', 'BigQueue', 'BigQuery', 'New Relic'],
      },
      {
        id: 'delivery-cart',
        nameKey: 'projects.delivery_cart.name',
        descriptionKey: 'projects.delivery_cart.description',
        technologies: ['Java', 'Spring Boot', 'REST', 'Kibana', 'Fury', 'BigQueue', 'BigQuery', 'New Relic'],
      },
    ],

    skillCategories: [
      {
        categoryKey: 'skills.category_backend',
        skills: ['Java', 'Spring Boot', 'Micronaut', 'Python', 'Hibernate', 'REST', 'gRPC'],
      },
      {
        categoryKey: 'skills.category_cloud',
        skills: ['AWS', 'OCI', 'GCP', 'Confluent Cloud', 'DataDog', 'New Relic', 'Kibana'],
      },
      {
        categoryKey: 'skills.category_data',
        skills: ['SQL', 'NoSQL', 'Kafka', 'PostgreSQL', 'MongoDB'],
      },
      {
        categoryKey: 'skills.category_tools',
        skills: ['Salesforce', 'Docker', 'Git', 'JIRA', 'Linux', 'Terraform'],
      },
      {
        categoryKey: 'skills.category_practices',
        skills: ['Prompt Engineering', 'Agile', 'Problem Solving', 'System Design', 'Agentic Software Engineering'],
      },
    ],

    languages: [
      { nameKey: 'languages.spanish', levelKey: 'languages.level_native', proficiency: 100 },
      { nameKey: 'languages.english', levelKey: 'languages.level_advanced', proficiency: 85 },
      { nameKey: 'languages.portuguese', levelKey: 'languages.level_intermediate', proficiency: 55 },
      { nameKey: 'languages.italian', levelKey: 'languages.level_elementary', proficiency: 25 },
    ],
  }
}
