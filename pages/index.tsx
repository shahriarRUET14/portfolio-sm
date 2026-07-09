import dynamic from 'next/dynamic';
import { openSource, showContactUs } from '../portfolio';
import SEO from '../components/SEO';
import type { GithubUserType } from '../types';

const Navigation = dynamic(() => import('../components/Navigation'));
const Greetings = dynamic(() => import('../containers/Greetings'));
const KeyAchievements = dynamic(() => import('../containers/KeyAchievements'));
const Skills = dynamic(() => import('../containers/Skills'));
const Education = dynamic(() => import('../containers/Education'));
const Experience = dynamic(() => import('../containers/Experience'));
const Projects = dynamic(() => import('../containers/Projects'));
const Contact = dynamic(() => import('../components/ContactUs'));
const Footer = dynamic(() => import('../components/Footer'));

const emptyGithubProfile: GithubUserType = {
  login: '',
  id: 0,
  node_id: '',
  avatar_url: '',
  gravatar_id: '',
  url: '',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: 'User',
  site_admin: false,
  name: '',
  company: '',
  blog: '',
  location: '',
  email: '',
  hireable: false,
  bio: '',
  twitter_username: '',
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '',
  updated_at: '',
};

export default function Home({
  githubProfileData,
}: {
  githubProfileData: GithubUserType;
}) {
  return (
    <>
      <SEO imageUrl={githubProfileData.avatar_url || undefined} />
      <Navigation />
      <main>
        <Greetings {...githubProfileData} />
        <KeyAchievements />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        {showContactUs ? <Contact /> : null}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${openSource.githubUserName}`
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const githubProfileData: GithubUserType = await res.json();
    return {
      props: { githubProfileData },
      revalidate: 86400,
    };
  } catch {
    return {
      props: { githubProfileData: emptyGithubProfile },
      revalidate: 86400,
    };
  }
}
