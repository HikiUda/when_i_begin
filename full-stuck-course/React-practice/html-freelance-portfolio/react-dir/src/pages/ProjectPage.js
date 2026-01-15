import { useParams } from 'react-router-dom';

import projects from '../helpers/projectsList';

import ButtonGitHub from '../components/buttonGitHub/ButtonGitHub';



const ProjectPage = (props) => {
	const { id } = useParams();

	const project = projects[id];

	if (!project) {
		return (<h1>404 Not found</h1>)
	}

	return (
		<main className="section">
			<div className="container">
				<div className="project-details">

					<h1 className="title-1">{project.title}</h1>

					<img src={project.imgBig} alt="" className="project-details__cover" />

					<div className="project-details__desc">
						<p>Skills: {project.skills}</p>
					</div>

					{project.gitHubLink && <ButtonGitHub link={project.gitHubLink} />}

				</div>
			</div>
		</main>
	);
}

export default ProjectPage;