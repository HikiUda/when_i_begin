import { NavLink } from "react-router-dom";

const Project = ({ project, index }) => {

	return (
		<NavLink to={`/project/${index}`} >
			<li className="project">
				<img src={project.img} alt="Project img" className="project__img" />
				<h3 className="project__title">{project.title}</h3>
			</li>
		</NavLink>
	);
}

export default Project;